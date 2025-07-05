# 🚀 快速配置指南

## 📝 配置API密钥（必需）

### 1. 获取ModelScope API密钥
1. 访问 [ModelScope官网](https://modelscope.cn/)
2. 注册/登录账户
3. 进入个人中心 → API管理
4. 创建新的API密钥
5. 复制API密钥（格式：`ms-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

### 2. 配置MCP文件
打开您的MCP配置文件：`/Users/alchain/.cursor/mcp.json`

找到以下部分：
```json
"ai-image-generator": {
  "command": "node",
  "args": ["/Users/alchain/11/AIpic/dist/index.js"],
  "env": {
    "MODELSCOPE_API_KEY": "your-modelscope-api-key-here"
  }
}
```

将 `"your-modelscope-api-key-here"` 替换为您的真实API密钥：
```json
"ai-image-generator": {
  "command": "node",
  "args": ["/Users/alchain/11/AIpic/dist/index.js"],
  "env": {
    "MODELSCOPE_API_KEY": "ms-your-actual-api-key-here"
  }
}
```

### 3. 重启Cursor
- 完全退出Cursor
- 重新启动Cursor
- 等待MCP服务器加载完成

## ✅ 验证配置

配置完成后，您可以在Cursor中测试：

```
请使用generate-single-image工具生成一张图片：
提示词：A beautiful sunset over mountains, photorealistic, high quality
```

如果配置正确，工具将正常生成图片。如果出现API密钥错误，请检查配置是否正确。

## 🎯 使用优势

### 相比之前的方式：
- ❌ **之前**：每次调用都需要传递API密钥
- ✅ **现在**：一次配置，长期使用

### 类似于Google Maps配置：
```json
"google-maps": {
  "env": {
    "GOOGLE_MAPS_API_KEY": "your-google-maps-key"
  }
},
"ai-image-generator": {
  "env": {
    "MODELSCOPE_API_KEY": "your-modelscope-key"
  }
}
```

## 🔧 故障排除

### 常见问题：

1. **工具提示API密钥未配置**
   - 检查配置文件中的密钥是否正确
   - 确认已重启Cursor
   - 验证密钥格式是否正确

2. **API调用失败**
   - 确认密钥有效且有足够配额
   - 检查网络连接
   - 验证ModelScope账户状态

3. **工具不可用**
   - 确认MCP配置文件语法正确
   - 检查服务器是否正在运行
   - 查看Cursor的MCP日志

## 🎉 开始使用

配置完成后，您可以使用以下工具：

- **analyze-and-generate-webpage-images** - 网页图片生成
- **analyze-and-generate-article-images** - 文章配图生成  
- **generate-single-image** - 单张图片生成
- **generate-enhanced-webpage** - HTML图片嵌入
- **translate-prompt-to-english** - 提示词翻译

享受便捷的AI图片生成体验！🎨 