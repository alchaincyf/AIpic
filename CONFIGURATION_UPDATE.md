# 🔄 配置方式更新

## 📋 更新内容

我们已经将API密钥配置方式从"每次调用传递"改为"环境变量配置"，使用体验更加便捷！

## 🔄 主要变化

### ❌ 之前的方式
```typescript
// 每次调用都需要传递API密钥
const result = await mcpClient.callTool("generate-single-image", {
  prompt: "A beautiful sunset",
  apiKey: "ms-your-api-key-here",  // 每次都要传递
  width: 1024,
  height: 768
});
```

### ✅ 现在的方式
```typescript
// 一次配置，长期使用
const result = await mcpClient.callTool("generate-single-image", {
  prompt: "A beautiful sunset",
  width: 1024,
  height: 768
});
```

## 🔧 配置更新

### 1. MCP配置文件已更新
您的 `/Users/alchain/.cursor/mcp.json` 现在包含：

```json
{
  "mcpServers": {
    "ai-image-generator": {
      "command": "node",
      "args": ["/Users/alchain/11/AIpic/dist/index.js"],
      "env": {
        "MODELSCOPE_API_KEY": "your-modelscope-api-key-here"
      }
    }
  }
}
```

### 2. 服务器代码已更新
- 从环境变量读取API密钥
- 启动时验证密钥是否配置
- 移除了所有工具参数中的 `apiKey` 要求

### 3. 文档已更新
- `README.md` - 主要文档
- `API_KEY_GUIDE.md` - API密钥使用指南
- `QUICK_SETUP.md` - 快速配置指南

## 🎯 使用优势

### 📱 便捷性
- **一次配置，长期使用** - 类似Google Maps配置
- **无需重复传递** - 工具调用更简洁
- **统一管理** - 所有API密钥在一个地方配置

### 🔒 安全性
- **环境变量隔离** - 密钥仅在服务器进程中可见
- **无硬编码** - 代码中不包含任何密钥信息
- **客户端控制** - 用户完全控制密钥配置

### 🛠️ 维护性
- **配置集中** - 所有MCP服务器配置在一个文件
- **易于管理** - 可以方便地更新或轮换密钥
- **标准化** - 遵循MCP最佳实践

## 📝 下一步操作

### 1. 配置API密钥
```bash
# 编辑MCP配置文件
vim /Users/alchain/.cursor/mcp.json

# 将 "your-modelscope-api-key-here" 替换为真实密钥
```

### 2. 重启Cursor
- 完全退出Cursor
- 重新启动Cursor
- 等待MCP服务器加载

### 3. 测试配置
在Cursor中尝试：
```
请使用generate-single-image工具生成一张图片：
提示词：A beautiful sunset over mountains, photorealistic
```

## 🎉 配置完成

现在您可以享受更便捷的AI图片生成体验了！

### 可用工具：
- `analyze-and-generate-webpage-images` - 网页图片生成
- `analyze-and-generate-article-images` - 文章配图生成
- `generate-single-image` - 单张图片生成
- `generate-enhanced-webpage` - HTML图片嵌入
- `translate-prompt-to-english` - 提示词翻译

### 可用资源：
- `generated://images` - 已生成图片列表
- `stats://generation` - 生成统计信息

---

�� **享受便捷的AI图片生成体验！** 