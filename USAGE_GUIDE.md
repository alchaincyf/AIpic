# AI图片生成MCP Server 使用指南

## 快速开始

### 1. 环境准备
确保您的系统已安装：
- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 2. 安装和运行
```bash
# 克隆或下载项目
cd ai-image-generator-mcp-server

# 安装依赖
npm install

# 编译TypeScript
npm run build

# 运行服务器
npm start
```

### 3. 获取API密钥
1. 访问 [ModelScope](https://modelscope.cn/)
2. 注册并登录
3. 在用户中心获取API密钥
4. 保存密钥供后续使用

## 详细使用教程

### 场景1：为网页生成图片

假设您有一个网页需要添加图片，可以使用以下步骤：

1. **准备HTML内容**
```html
<!DOCTYPE html>
<html>
<head>
    <title>我的产品页面</title>
</head>
<body>
    <h1>革命性的AI产品</h1>
    <img src="placeholder.jpg" alt="产品展示图">
    <p>这是一款改变世界的AI产品...</p>
</body>
</html>
```

2. **调用分析和生成工具**
```javascript
// 在支持MCP的客户端中调用
const result = await callTool("analyze-and-generate-webpage-images", {
    html: htmlContent,
    apiKey: "your-modelscope-api-key",
    generateImages: true
});
```

3. **查看分析结果**
服务器会返回：
- 识别到的图片需求
- 生成的AI图片URL
- 建议的图片描述和尺寸

### 场景2：为文章生成配图

1. **准备文章内容**
```text
人工智能的未来发展

人工智能技术正在快速发展，深度学习和神经网络的突破为AI带来了前所未有的能力。从计算机视觉到自然语言处理，AI正在改变我们的生活方式。

机器学习算法的进步使得AI系统能够从大量数据中学习复杂的模式。这些技术被广泛应用于医疗诊断、自动驾驶、金融分析等领域。

未来，AI将继续发展，可能会带来更多创新的应用场景...
```

2. **调用文章分析工具**
```javascript
const result = await callTool("analyze-and-generate-article-images", {
    content: articleContent,
    title: "人工智能的未来发展",
    apiKey: "your-modelscope-api-key",
    generateImages: true
});
```

### 场景3：生成单张定制图片

```javascript
const result = await callTool("generate-single-image", {
    prompt: "A futuristic AI robot in a modern office, professional photography, high quality, detailed",
    apiKey: "your-modelscope-api-key",
    width: 1024,
    height: 768
});
```

## 高级功能

### 1. 批量图片生成
服务器支持同时为多个区域生成图片，提高效率：

```javascript
// 服务器会自动并行处理多个图片生成请求
const result = await callTool("analyze-and-generate-webpage-images", {
    html: complexHtmlWithMultipleImages,
    apiKey: "your-api-key",
    generateImages: true
});
```

### 2. 自定义图片风格
通过提示词翻译工具，您可以指定特定的图片风格：

```javascript
const result = await callTool("translate-prompt-to-english", {
    chinesePrompt: "现代科技办公室",
    style: "photorealistic"
});
// 返回优化后的英文提示词
```

### 3. HTML增强
将生成的图片自动嵌入到原始HTML中：

```javascript
const enhancedHtml = await callTool("generate-enhanced-webpage", {
    originalHtml: originalHtmlContent,
    imageMapping: {
        "image-id-1": "https://generated-image-url-1.jpg",
        "image-id-2": "https://generated-image-url-2.jpg"
    }
});
```

## 配置选项

### 图片生成参数
- `width`: 图片宽度（200-1200像素）
- `height`: 图片高度（200-1200像素）
- `model`: 使用的AI模型（默认：MusePublic/489_ckpt_FLUX_1）

### 分析参数
- `generateImages`: 是否立即生成图片（默认：true）
- `style`: 图片风格（photorealistic, artistic, modern等）

## 错误处理

### 常见错误及解决方案

1. **API密钥错误**
```
错误: Image generation failed: Unauthorized
解决: 检查API密钥是否正确，确保账户有足够的配额
```

2. **网络连接问题**
```
错误: Image generation failed: Network Error
解决: 检查网络连接，确保能访问ModelScope API
```

3. **HTML解析错误**
```
错误: 无法解析HTML内容
解决: 确保HTML格式正确，包含有效的标签结构
```

## 性能优化建议

### 1. 批量处理
- 尽量一次性处理多个图片需求
- 避免频繁的单个图片生成请求

### 2. 缓存管理
- 服务器会自动缓存生成的图片信息
- 可以通过资源接口查看已生成的图片

### 3. 提示词优化
- 使用具体、描述性的提示词
- 避免过于复杂或模糊的描述

## 集成示例

### 与Claude Desktop集成
1. 找到Claude Desktop配置文件
2. 添加MCP服务器配置：
```json
{
  "mcpServers": {
    "ai-image-generator": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

### 与其他MCP客户端集成
根据客户端文档，添加相应的服务器配置。

## 监控和调试

### 查看生成统计
```javascript
// 获取生成统计信息
const stats = await getResource("stats://generation");
console.log(stats);
```

### 查看已生成图片
```javascript
// 获取所有已生成的图片
const images = await getResource("generated://images");
console.log(images);
```

## 最佳实践

1. **合理使用API配额**
   - 避免重复生成相同内容的图片
   - 使用缓存机制减少API调用

2. **优化提示词**
   - 使用英文提示词获得更好效果
   - 包含风格、质量等描述词

3. **图片尺寸选择**
   - 根据实际用途选择合适的尺寸
   - 避免过大的图片影响加载速度

4. **错误处理**
   - 实现适当的错误处理逻辑
   - 提供备用方案

## 常见问题解答

**Q: 支持哪些图片格式？**
A: 目前支持JPEG和PNG格式。

**Q: 生成的图片有版权问题吗？**
A: 生成的图片基于AI模型创建，但建议在商业使用前咨询相关法律意见。

**Q: 可以生成多大的图片？**
A: 支持200x200到1200x1200像素的图片。

**Q: 如何提高图片生成质量？**
A: 使用详细、具体的英文提示词，并指定合适的风格参数。

**Q: 服务器支持多少并发请求？**
A: 取决于您的ModelScope API配额和服务器性能。

## 技术支持

如果您在使用过程中遇到问题：
1. 检查本指南中的常见问题
2. 查看服务器日志获取详细错误信息
3. 确保API密钥和网络连接正常
4. 联系技术支持团队 