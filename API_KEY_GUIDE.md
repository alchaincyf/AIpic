# API密钥使用指南

## 🔑 API密钥配置机制

本AI图片生成MCP Server采用**环境变量配置**的安全设计，API密钥配置在MCP客户端的环境变量中，类似于Google Maps的配置方式，使用更加方便和安全。

## 📋 配置完成

✅ **MCP Server已成功添加到Cursor配置中**

您的`/Users/alchain/.cursor/mcp.json`配置文件已更新：

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

## 🔐 API密钥获取步骤

### 1. 访问ModelScope
1. 打开 [ModelScope官网](https://modelscope.cn/)
2. 注册/登录账户
3. 进入用户中心
4. 找到API密钥管理
5. 创建新的API密钥

### 2. 保存API密钥
```
示例格式：ms-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🚀 使用方法

### 配置API密钥

在使用前，请先在MCP配置文件中设置您的ModelScope API密钥：

1. 打开 `/Users/alchain/.cursor/mcp.json`
2. 将 `"your-modelscope-api-key-here"` 替换为您的真实API密钥
3. 保存文件并重启Cursor

### 在Cursor中使用

配置完成后，您可以直接在对话中使用以下工具（无需再传递API密钥）：

#### 1. 分析网页并生成图片
```
请使用analyze-and-generate-webpage-images工具分析这个HTML：
<html>...</html>
```

#### 2. 为文章生成配图
```
请使用analyze-and-generate-article-images工具为这篇文章生成配图：

标题：人工智能的发展趋势
内容：人工智能技术正在快速发展...
```

#### 3. 生成单张图片
```
请使用generate-single-image工具生成一张图片：
提示词：A modern office with AI robots working alongside humans, professional photography, high quality
```

## 🛡️ 安全特性

### ✅ 优势
- **环境变量配置**：API密钥存储在MCP配置的环境变量中
- **客户端控制**：用户完全控制API密钥的配置和使用
- **无硬编码**：服务器代码中不包含任何密钥信息
- **便捷管理**：类似Google Maps配置，一次配置长期使用
- **安全隔离**：密钥仅在服务器进程的环境变量中可见

### 🔒 安全建议
1. **不要在代码中硬编码API密钥**
2. **定期轮换API密钥**
3. **监控API使用量和费用**
4. **不要在公共场所分享包含API密钥的截图**

## 📊 工具参数说明

### analyze-and-generate-webpage-images
- `html`: 网页HTML内容（必需）
- `generateImages`: 是否立即生成图片（默认：true）

### analyze-and-generate-article-images  
- `content`: 文章内容（必需）
- `title`: 文章标题（可选）
- `generateImages`: 是否立即生成图片（默认：true）

### generate-single-image
- `prompt`: 英文提示词（必需）
- `width`: 图片宽度（默认：1024）
- `height`: 图片高度（默认：1024）
- `model`: 模型名称（可选，默认：MusePublic/489_ckpt_FLUX_1）

### generate-enhanced-webpage
- `originalHtml`: 原始HTML内容（必需）
- `imageMapping`: 图片ID到URL的映射（必需）

### translate-prompt-to-english
- `chinesePrompt`: 中文提示词（必需）
- `style`: 图片风格（可选）

## 🔄 重启说明

配置文件已更新，请：

1. **保存所有工作**
2. **完全退出Cursor**
3. **重新启动Cursor**
4. **等待MCP服务器加载完成**

## ✨ 使用示例

### 示例1：网页图片生成
```
我有一个电商网站需要产品图片，请帮我分析并生成：

HTML内容：
<!DOCTYPE html>
<html>
<head><title>智能手表商城</title></head>
<body>
    <h1>最新智能手表</h1>
    <img src="placeholder.jpg" alt="智能手表产品图">
    <p>功能强大的智能手表，支持健康监测...</p>
</body>
</html>
```

### 示例2：文章配图生成
```
请为我的科技博客文章生成配图：

标题：《2024年AI发展趋势》
内容：
人工智能在2024年将迎来重大突破。从大语言模型到计算机视觉，AI技术正在改变各个行业...

机器学习算法的进步使得AI系统能够更好地理解和处理复杂数据...
```

## 🆘 故障排除

### 常见问题

1. **工具不可用**
   - 确认Cursor已重启
   - 检查MCP配置文件语法
   - 确认服务器进程正在运行

2. **API密钥错误**
   - 检查密钥格式是否正确
   - 确认账户有足够配额
   - 验证网络连接

3. **生成失败**
   - 检查提示词是否合适
   - 确认图片尺寸在支持范围内
   - 查看错误信息详情

### 获取帮助
- 查看服务器日志
- 检查网络连接
- 验证API密钥状态
- 联系技术支持

## 🎉 开始使用

现在您可以：
1. ✅ 重启Cursor
2. ✅ 准备ModelScope API密钥  
3. ✅ 开始使用AI图片生成功能
4. ✅ 享受智能化的图片生成体验！ 