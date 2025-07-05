#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ImageGenerator } from "./imageGenerator.js";
import { ContentAnalyzer } from "./analyzer.js";
import { 
  WebPageAnalysis, 
  ArticleAnalysis, 
  ImageRequirement, 
  GeneratedImage 
} from "./types.js";

class AIImageGeneratorMCPServer {
  private server: McpServer;
  private imageGenerator: ImageGenerator | null = null;
  private analyzer: ContentAnalyzer;
  private generatedImages: Map<string, GeneratedImage> = new Map();
  private apiKey: string;

  constructor() {
    this.server = new McpServer({
      name: "ai-image-generator",
      version: "1.0.0"
    });
    
    // 从环境变量获取API密钥
    this.apiKey = process.env.MODELSCOPE_API_KEY || '';
    if (!this.apiKey) {
      console.error("警告: 未找到MODELSCOPE_API_KEY环境变量，请在MCP配置中设置");
    } else {
      // 初始化图片生成器
      this.imageGenerator = new ImageGenerator(this.apiKey);
      console.error("✅ ModelScope API密钥已从环境变量加载");
    }
    
    this.analyzer = new ContentAnalyzer();
    this.setupTools();
    this.setupResources();
  }

  private setupTools() {
    // 工具1：分析网页内容并生成图片
    this.server.registerTool(
      "analyze-and-generate-webpage-images",
      {
        title: "分析网页并生成图片",
        description: "分析网页HTML内容，识别需要图片的区域并生成相应的AI图片",
        inputSchema: {
          html: z.string().describe("网页HTML内容"),
          generateImages: z.boolean().default(true).describe("是否立即生成图片")
        }
      },
      async ({ html, generateImages }) => {
        try {
          // 检查API密钥是否可用
          if (!this.imageGenerator) {
            return {
              content: [{
                type: "text",
                text: "错误: ModelScope API密钥未配置，请在MCP配置文件中设置MODELSCOPE_API_KEY环境变量"
              }],
              isError: true
            };
          }
          
          // 分析网页内容
          const analysis = this.analyzer.analyzeWebPage(html);
          
          let result = {
            analysis,
            generatedImages: [] as any[]
          };
          
          if (generateImages && analysis.imageRequirements.length > 0) {
            // 生成图片
            const imagePromises = analysis.imageRequirements.map(async (req) => {
              try {
                const response = await this.imageGenerator!.generateImage({
                  prompt: req.suggestedPrompt,
                  width: req.dimensions.width,
                  height: req.dimensions.height
                });
                
                if (response.images.length > 0) {
                  const generatedImage: GeneratedImage = {
                    id: req.id,
                    url: response.images[0].url,
                    prompt: req.suggestedPrompt,
                    dimensions: req.dimensions,
                    generatedAt: new Date()
                  };
                  
                  this.generatedImages.set(req.id, generatedImage);
                  return generatedImage;
                }
                return null;
              } catch (error) {
                console.error(`生成图片失败 (${req.id}):`, error);
                return null;
              }
            });
            
            const images = await Promise.all(imagePromises);
            result.generatedImages = images.filter(img => img !== null);
          }
          
          return {
            content: [{
              type: "text",
              text: JSON.stringify(result, null, 2)
            }]
          };
          
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: `错误: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // 工具2：分析文章内容并生成配图
    this.server.registerTool(
      "analyze-and-generate-article-images",
      {
        title: "分析文章并生成配图",
        description: "分析文章内容，识别需要配图的段落并生成相应的AI图片",
        inputSchema: {
          content: z.string().describe("文章内容"),
          title: z.string().optional().describe("文章标题"),
          generateImages: z.boolean().default(true).describe("是否立即生成图片")
        }
      },
      async ({ content, title, generateImages }) => {
        try {
          // 检查API密钥是否可用
          if (!this.imageGenerator) {
            return {
              content: [{
                type: "text",
                text: "错误: ModelScope API密钥未配置，请在MCP配置文件中设置MODELSCOPE_API_KEY环境变量"
              }],
              isError: true
            };
          }
          
          // 分析文章内容
          const analysis = this.analyzer.analyzeArticle(content, title);
          
          let result = {
            analysis,
            generatedImages: [] as any[]
          };
          
          if (generateImages && analysis.imageRequirements.length > 0) {
            // 生成图片
            const imagePromises = analysis.imageRequirements.map(async (req) => {
              try {
                const response = await this.imageGenerator!.generateImage({
                  prompt: req.suggestedPrompt,
                  width: req.dimensions.width,
                  height: req.dimensions.height
                });
                
                if (response.images.length > 0) {
                  const generatedImage: GeneratedImage = {
                    id: req.id,
                    url: response.images[0].url,
                    prompt: req.suggestedPrompt,
                    dimensions: req.dimensions,
                    generatedAt: new Date()
                  };
                  
                  this.generatedImages.set(req.id, generatedImage);
                  return generatedImage;
                }
                return null;
              } catch (error) {
                console.error(`生成图片失败 (${req.id}):`, error);
                return null;
              }
            });
            
            const images = await Promise.all(imagePromises);
            result.generatedImages = images.filter(img => img !== null);
          }
          
          return {
            content: [{
              type: "text",
              text: JSON.stringify(result, null, 2)
            }]
          };
          
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: `错误: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // 工具3：生成单张图片
    this.server.registerTool(
      "generate-single-image",
      {
        title: "生成单张图片",
        description: "根据提示词生成单张AI图片",
        inputSchema: {
          prompt: z.string().describe("英文提示词"),
          width: z.number().default(1024).describe("图片宽度"),
          height: z.number().default(1024).describe("图片高度"),
          model: z.string().optional().describe("使用的模型名称")
        }
      },
      async ({ prompt, width, height, model }) => {
        try {
          // 检查API密钥是否可用
          if (!this.imageGenerator) {
            return {
              content: [{
                type: "text",
                text: "错误: ModelScope API密钥未配置，请在MCP配置文件中设置MODELSCOPE_API_KEY环境变量"
              }],
              isError: true
            };
          }
          
          const response = await this.imageGenerator.generateImage({
            prompt,
            width,
            height,
            model
          });
          
          if (response.images.length > 0) {
            return {
              content: [{
                type: "text",
                text: JSON.stringify({
                  success: true,
                  image: response.images[0],
                  prompt
                }, null, 2)
              }]
            };
          } else {
            return {
              content: [{
                type: "text",
                text: "没有生成图片"
              }],
              isError: true
            };
          }
          
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: `错误: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // 工具4：生成网页HTML（包含生成的图片）
    this.server.registerTool(
      "generate-enhanced-webpage",
      {
        title: "生成增强网页",
        description: "将生成的图片嵌入到原始HTML中，返回完整的网页代码",
        inputSchema: {
          originalHtml: z.string().describe("原始HTML内容"),
          imageMapping: z.record(z.string()).describe("图片ID到URL的映射")
        }
      },
      async ({ originalHtml, imageMapping }) => {
        try {
          const enhancedHtml = this.enhanceHtmlWithImages(originalHtml, imageMapping);
          
          return {
            content: [{
              type: "text",
              text: enhancedHtml
            }]
          };
          
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: `错误: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );

    // 工具5：翻译中文提示词为英文
    this.server.registerTool(
      "translate-prompt-to-english",
      {
        title: "翻译提示词为英文",
        description: "将中文图片描述翻译为适合AI图片生成的英文提示词",
        inputSchema: {
          chinesePrompt: z.string().describe("中文提示词或描述"),
          style: z.string().optional().describe("图片风格（如：photorealistic, artistic, modern等）")
        }
      },
      async ({ chinesePrompt, style }) => {
        try {
          const englishPrompt = this.translateToEnglishPrompt(chinesePrompt, style);
          
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                original: chinesePrompt,
                translated: englishPrompt,
                style: style || "photorealistic"
              }, null, 2)
            }]
          };
          
        } catch (error) {
          return {
            content: [{
              type: "text",
              text: `错误: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
          };
        }
      }
    );
  }

  private setupResources() {
    // 资源1：获取已生成的图片列表
    this.server.registerResource(
      "generated-images",
      "generated://images",
      {
        title: "已生成图片列表",
        description: "获取所有已生成的AI图片信息",
        mimeType: "application/json"
      },
      async () => {
        const images = Array.from(this.generatedImages.values());
        return {
          contents: [{
            uri: "generated://images",
            text: JSON.stringify(images, null, 2)
          }]
        };
      }
    );

    // 资源2：获取图片生成统计信息
    this.server.registerResource(
      "generation-stats",
      "stats://generation",
      {
        title: "图片生成统计",
        description: "获取图片生成的统计信息",
        mimeType: "application/json"
      },
      async () => {
        const stats = {
          totalGenerated: this.generatedImages.size,
          recentGenerations: Array.from(this.generatedImages.values())
            .sort((a, b) => b.generatedAt.getTime() - a.generatedAt.getTime())
            .slice(0, 10)
        };
        
        return {
          contents: [{
            uri: "stats://generation",
            text: JSON.stringify(stats, null, 2)
          }]
        };
      }
    );
  }

  private enhanceHtmlWithImages(html: string, imageMapping: Record<string, string>): string {
    // 这里可以实现更复杂的HTML增强逻辑
    // 现在只是简单的字符串替换示例
    let enhancedHtml = html;
    
    Object.entries(imageMapping).forEach(([imageId, imageUrl]) => {
      // 查找对应的图片元素并替换src
      const placeholderPatterns = [
        new RegExp(`src=["'][^"']*placeholder[^"']*["']`, 'gi'),
        new RegExp(`src=["'][^"']*example[^"']*["']`, 'gi'),
        new RegExp(`data-image-id=["']${imageId}["']`, 'gi')
      ];
      
      placeholderPatterns.forEach(pattern => {
        enhancedHtml = enhancedHtml.replace(pattern, `src="${imageUrl}"`);
      });
    });
    
    return enhancedHtml;
  }

  private translateToEnglishPrompt(chinesePrompt: string, style?: string): string {
    // 这里可以实现更复杂的翻译逻辑
    // 现在只是简单的示例翻译
    const translations: Record<string, string> = {
      '商务': 'business',
      '专业': 'professional',
      '现代': 'modern',
      '科技': 'technology',
      '创意': 'creative',
      '艺术': 'artistic',
      '简约': 'minimalist',
      '优雅': 'elegant',
      '时尚': 'stylish',
      '自然': 'natural',
      '风景': 'landscape',
      '人物': 'portrait',
      '建筑': 'architecture',
      '抽象': 'abstract',
      '彩色': 'colorful',
      '黑白': 'black and white',
      '高质量': 'high quality',
      '详细': 'detailed',
      '精美': 'beautiful',
      '清晰': 'clear'
    };
    
    let englishPrompt = chinesePrompt;
    
    // 简单的词汇替换
    Object.entries(translations).forEach(([chinese, english]) => {
      englishPrompt = englishPrompt.replace(new RegExp(chinese, 'g'), english);
    });
    
    // 添加风格描述
    if (style) {
      englishPrompt += `, ${style} style`;
    }
    
    // 添加质量描述
    englishPrompt += ', high quality, professional, detailed';
    
    return englishPrompt;
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("AI图片生成MCP Server已启动");
  }
}

// 启动服务器
const server = new AIImageGeneratorMCPServer();
server.start().catch((error) => {
  console.error("服务器启动失败:", error);
  process.exit(1);
}); 