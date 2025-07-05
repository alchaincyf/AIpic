import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import { WebPageAnalysis, ArticleAnalysis, ImageRequirement } from './types.js';

export class ContentAnalyzer {
  
  /**
   * 分析网页内容，识别需要图片的区域
   */
  analyzeWebPage(html: string): WebPageAnalysis {
    const $ = cheerio.load(html);
    const title = $('title').text() || $('h1').first().text() || 'Untitled Page';
    
    const imageRequirements: ImageRequirement[] = [];
    
    // 分析现有的img标签
    $('img').each((_, element) => {
      const $img = $(element);
      const src = $img.attr('src');
      const alt = $img.attr('alt') || '';
      const width = parseInt($img.attr('width') || '400');
      const height = parseInt($img.attr('height') || '300');
      
      // 跳过已有真实图片的元素
      if (src && !src.includes('placeholder') && !src.includes('example')) {
        return;
      }
      
      const context = this.getElementContext($, element);
      const description = this.generateImageDescription(context, alt);
      
      imageRequirements.push({
        id: uuidv4(),
        selector: this.generateSelector($, element),
        description,
        suggestedPrompt: this.generatePrompt(description, context),
        dimensions: { width, height },
        alt,
        context
      });
    });
    
    // 分析可能需要图片的区域
    const potentialImageAreas = [
      'header', 'hero', 'banner', '.hero-section', '.banner', 
      '.feature', '.card', '.product', '.service', '.team-member',
      '.testimonial', '.gallery', '.portfolio-item', 'article',
      '.blog-post', '.news-item'
    ];
    
    potentialImageAreas.forEach(selector => {
      $(selector).each((_, element) => {
        const $element = $(element);
        
        // 如果已经有图片，跳过
        if ($element.find('img').length > 0) return;
        
        const context = this.getElementContext($, element);
        const description = this.generateImageDescription(context);
        
        if (description) {
          imageRequirements.push({
            id: uuidv4(),
            selector: this.generateSelector($, element),
            description,
            suggestedPrompt: this.generatePrompt(description, context),
            dimensions: this.inferDimensions($, element),
            context
          });
        }
      });
    });
    
    return {
      title,
      imageRequirements,
      overallTheme: this.inferTheme($),
      colorScheme: this.inferColorScheme($),
      style: this.inferStyle($)
    };
  }
  
  /**
   * 分析文章内容，识别需要配图的段落
   */
  analyzeArticle(content: string, title?: string): ArticleAnalysis {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    const imageRequirements: ImageRequirement[] = [];
    
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.length > 200) { // 长段落可能需要配图
        const description = this.generateImageDescriptionFromText(paragraph);
        if (description) {
          imageRequirements.push({
            id: uuidv4(),
            selector: `p:nth-child(${index + 1})`,
            description,
            suggestedPrompt: this.generatePrompt(description, paragraph),
            dimensions: { width: 600, height: 400 },
            context: paragraph.substring(0, 200) + '...'
          });
        }
      }
    });
    
    return {
      title: title || 'Article',
      content,
      imageRequirements,
      theme: this.inferArticleTheme(content),
      tone: this.inferArticleTone(content)
    };
  }
  
  private getElementContext($: cheerio.CheerioAPI, element: any): string {
    const $element = $(element);
    const texts: string[] = [];
    
    // 获取元素内的文本
    const elementText = $element.text().trim();
    if (elementText) texts.push(elementText);
    
    // 获取相邻元素的文本
    const prevText = $element.prev().text().trim();
    if (prevText) texts.push(prevText);
    
    const nextText = $element.next().text().trim();
    if (nextText) texts.push(nextText);
    
    // 获取父元素的文本
    const parentText = $element.parent().text().trim();
    if (parentText && parentText !== elementText) {
      texts.push(parentText.substring(0, 100));
    }
    
    return texts.join(' ').substring(0, 300);
  }
  
  private generateSelector($: cheerio.CheerioAPI, element: any): string {
    const $element = $(element);
    const tagName = element.tagName.toLowerCase();
    const id = $element.attr('id');
    const className = $element.attr('class');
    
    if (id) return `#${id}`;
    if (className) return `.${className.split(' ')[0]}`;
    
    // 生成nth-child选择器
    const index = $element.index();
    return `${tagName}:nth-child(${index + 1})`;
  }
  
  private generateImageDescription(context: string, alt?: string): string {
    if (alt && alt.length > 0) return alt;
    
    // 基于上下文生成描述
    const keywords = this.extractKeywords(context);
    if (keywords.length === 0) return '';
    
    return `Image related to ${keywords.slice(0, 3).join(', ')}`;
  }
  
  private generateImageDescriptionFromText(text: string): string {
    const keywords = this.extractKeywords(text);
    if (keywords.length < 2) return '';
    
    return `Illustration for ${keywords.slice(0, 3).join(', ')}`;
  }
  
  private generatePrompt(description: string, context: string): string {
    const keywords = this.extractKeywords(context);
    const style = this.inferImageStyle(context);
    
    let prompt = description;
    
    // 添加风格描述
    if (style) {
      prompt += `, ${style} style`;
    }
    
    // 添加质量描述
    prompt += ', high quality, professional, detailed';
    
    // 添加相关关键词
    if (keywords.length > 0) {
      prompt += `, featuring ${keywords.slice(0, 2).join(' and ')}`;
    }
    
    return prompt;
  }
  
  private extractKeywords(text: string): string[] {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // 简单的关键词提取（实际应用中可以使用更复杂的NLP技术）
    const commonWords = new Set(['this', 'that', 'with', 'have', 'will', 'been', 'from', 'they', 'know', 'want', 'been', 'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just', 'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them', 'well', 'were']);
    
    return words
      .filter(word => !commonWords.has(word))
      .slice(0, 10);
  }
  
  private inferDimensions($: cheerio.CheerioAPI, element: any): { width: number; height: number } {
    const $element = $(element);
    const className = $element.attr('class') || '';
    
    // 基于类名推断尺寸
    if (className.includes('hero') || className.includes('banner')) {
      return { width: 1200, height: 600 };
    }
    if (className.includes('card') || className.includes('feature')) {
      return { width: 400, height: 300 };
    }
    if (className.includes('avatar') || className.includes('profile')) {
      return { width: 200, height: 200 };
    }
    
    return { width: 600, height: 400 };
  }
  
  private inferTheme($: cheerio.CheerioAPI): string {
    const title = $('title').text().toLowerCase();
    const headings = $('h1, h2, h3').text().toLowerCase();
    const content = (title + ' ' + headings).toLowerCase();
    
    if (content.includes('business') || content.includes('corporate')) return 'business';
    if (content.includes('tech') || content.includes('software')) return 'technology';
    if (content.includes('food') || content.includes('restaurant')) return 'food';
    if (content.includes('travel') || content.includes('tourism')) return 'travel';
    if (content.includes('health') || content.includes('medical')) return 'healthcare';
    if (content.includes('education') || content.includes('learning')) return 'education';
    
    return 'general';
  }
  
  private inferColorScheme($: cheerio.CheerioAPI): string {
    // 简单的颜色推断（实际应用中可以分析CSS）
    return 'modern';
  }
  
  private inferStyle($: cheerio.CheerioAPI): string {
    const classes = $('*').map((_, el) => $(el).attr('class')).get().join(' ');
    
    if (classes.includes('minimal')) return 'minimal';
    if (classes.includes('modern')) return 'modern';
    if (classes.includes('classic')) return 'classic';
    
    return 'professional';
  }
  
  private inferImageStyle(context: string): string {
    const lowerContext = context.toLowerCase();
    
    if (lowerContext.includes('professional') || lowerContext.includes('business')) {
      return 'professional photography';
    }
    if (lowerContext.includes('creative') || lowerContext.includes('art')) {
      return 'artistic illustration';
    }
    if (lowerContext.includes('tech') || lowerContext.includes('digital')) {
      return 'modern digital art';
    }
    
    return 'photorealistic';
  }
  
  private inferArticleTheme(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('technology') || lowerContent.includes('software')) return 'technology';
    if (lowerContent.includes('business') || lowerContent.includes('marketing')) return 'business';
    if (lowerContent.includes('health') || lowerContent.includes('wellness')) return 'health';
    if (lowerContent.includes('travel') || lowerContent.includes('adventure')) return 'travel';
    if (lowerContent.includes('food') || lowerContent.includes('cooking')) return 'food';
    
    return 'general';
  }
  
  private inferArticleTone(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('exciting') || lowerContent.includes('amazing')) return 'enthusiastic';
    if (lowerContent.includes('professional') || lowerContent.includes('analysis')) return 'professional';
    if (lowerContent.includes('friendly') || lowerContent.includes('welcome')) return 'friendly';
    
    return 'informative';
  }
} 