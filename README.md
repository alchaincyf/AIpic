# AI Image Generator MCP Server

[![npm version](https://badge.fury.io/js/@alchain/mcp-flux-web-image-generator.svg)](https://badge.fury.io/js/@alchain/mcp-flux-web-image-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

一个强大的MCP（Model Context Protocol）服务器，专为AI图片生成而设计。支持智能网页分析、文章配图生成，并集成魔搭社区的FLUX模型。通过简单配置即可为您的应用添加AI图片生成能力。

## 🚀 MCP服务配置

```json
{
  "mcpServers": {
    "ai-image-generator": {
      "command": "npx",
      "args": ["@alchain/mcp-flux-web-image-generator@latest"],
      "env": {
        "MODELSCOPE_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

> 💡 将 `YOUR_API_KEY` 替换为您从[魔搭社区](https://modelscope.cn/my/myaccesstoken)获取的API密钥

## ✨ 主要特性

- 🎨 **智能图片生成** - 使用魔搭社区FLUX模型生成高质量图片
- 🌐 **网页分析** - 自动分析HTML内容，识别需要图片的区域
- 📝 **文章配图** - 为文章内容生成相关配图
- 🔄 **提示词翻译** - 智能将中文描述转换为英文提示词
- 🚀 **批量处理** - 支持批量图片生成和处理
- 🔧 **环境变量配置** - 安全的API密钥管理
- 💰 **免费额度** - 每日2000次免费调用，满足个人使用需求
- 🛠️ **即插即用** - 通过npx直接使用，无需本地安装

## 📦 安装

### 推荐方式：直接使用npm包

本项目已发布为npm包，**无需手动安装**！直接在MCP客户端配置中使用 `npx @alchain/mcp-flux-web-image-generator` 即可。

### 可选：全局安装

如果您希望全局安装：

```bash
npm install -g @alchain/mcp-flux-web-image-generator
```

### 从源码构建

```bash
git clone https://github.com/alchaincyf/AIpic.git
cd AIpic
npm install
npm run build
```

## 🚀 快速开始

### 1. 获取API密钥

访问[魔搭社区API密钥页面](https://modelscope.cn/my/myaccesstoken)获取您的API密钥。

> 💡 **免费额度**: 魔搭社区提供的API每天可以免费调用2000次，完全够个人使用！

**获取步骤：**
1. 注册并登录[魔搭社区](https://modelscope.cn)
2. 访问[API密钥管理页面](https://modelscope.cn/my/myaccesstoken)
3. 创建新的API密钥
4. 复制生成的密钥用于配置

> ⚠️ **注意**: 请妥善保管您的API密钥，不要在公开代码中暴露

### 2. 配置MCP客户端（推荐）

**无需安装，直接配置即可使用！**

本项目已发布为npm包，您可以直接在MCP客户端中使用。

#### 对于Cursor用户

在 `~/.cursor/mcp.json` 中添加：

```json
{
  "mcpServers": {
    "ai-image-generator": {
      "command": "npx",
      "args": ["@alchain/mcp-flux-web-image-generator@latest"],
      "env": {
        "MODELSCOPE_API_KEY": "your-modelscope-api-key-here"
      }
    }
  }
}
```

#### 对于Claude Desktop用户

在 `~/Library/Application Support/Claude/claude_desktop_config.json` 中添加：

```json
{
  "mcpServers"
    "ai-image-generator": {
      "command": "npx",
      "args": ["@alchain/mcp-flux-web-image-generator@latest"],
      "env": {
        "MODELSCOPE_API_KEY": "your-modelscope-api-key-here"
      }
    }
  }
}
```

> 📝 **配置说明**: 
> - 使用 `npx` 命令可以直接运行npm包，无需全局安装
> - 建议使用 `@latest` 后缀确保使用最新版本
> - 将 `your-modelscope-api-key-here` 替换为您从[魔搭社区](https://modelscope.cn/my/myaccesstoken)获取的实际API密钥
> - 配置完成后MCP服务会自动下载并启动

### 3. 重启客户端

重启Cursor或Claude Desktop以加载MCP服务器。

### 4. 开始使用

配置完成后，您就可以在对话中使用AI图片生成功能了！MCP服务器会自动下载并运行。

**测试连接：**
在对话中输入类似以下内容来测试MCP服务是否正常工作：
- "帮我生成一张现代科技感的图片"
- "为我的网页生成一些产品图片"
- "分析这个HTML并生成相应的图片"

## 🛠️ 可用工具

本MCP服务提供以下5个核心工具：

### 1. 网页图片分析生成
**工具名称：** `analyze-and-generate-webpage-images`
**功能：** 分析HTML内容，识别需要图片的区域并生成相应图片
**适用场景：** 网站开发、页面设计、内容填充

### 2. 文章配图生成
**工具名称：** `analyze-and-generate-article-images`
**功能：** 为文章内容生成相关配图
**适用场景：** 博客写作、内容创作、文档配图

### 3. 单张图片生成
**工具名称：** `generate-single-image`
**功能：** 根据提示词生成单张定制图片
**适用场景：** 创意设计、素材制作、概念图生成

### 4. 网页图片嵌入
**工具名称：** `generate-enhanced-webpage`
**功能：** 将生成的图片嵌入到HTML中
**适用场景：** 网页优化、内容完善、自动化部署

### 5. 提示词翻译
**工具名称：** `translate-prompt-to-english`
**功能：** 将中文描述智能转换为英文提示词
**适用场景：** 跨语言创作、提示词优化、国际化支持

## 📚 详细文档

- [API密钥配置指南](./API_KEY_GUIDE.md) - 详细的API密钥获取和配置说明
- [详细使用教程](./USAGE_GUIDE.md) - 完整的使用教程和示例
- [快速配置指南](./QUICK_SETUP.md) - 快速上手指南

## 🔧 技术规格

- **运行环境**: Node.js >= 18.0.0
- **协议支持**: Model Context Protocol (MCP)
- **图片模型**: 魔搭社区 FLUX 模型
- **包管理**: NPM 包，支持 npx 直接运行
- **托管类型**: 可托管部署（支持远程运行）
- **环境变量**: 仅需 MODELSCOPE_API_KEY

## 🔐 环境变量配置

本MCP服务需要以下环境变量：

| 变量名 | 必需 | 描述 | 获取方式 |
|--------|------|------|----------|
| `MODELSCOPE_API_KEY` | ✅ | 魔搭社区API密钥 | [点击获取](https://modelscope.cn/my/myaccesstoken) |

**配置示例：**
```json
{
  "env": {
    "MODELSCOPE_API_KEY": "ms-your-api-key-here"
  }
}
```

## 🔧 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/alchaincyf/AIpic.git
cd AIpic

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建项目
npm run build

# 启动服务器
npm start
```

### 项目结构

```
src/
├── index.ts          # 主服务器文件
├── types.ts          # 类型定义
├── imageGenerator.ts # 图片生成服务
└── analyzer.ts       # 内容分析器
```

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 这个仓库 [https://github.com/alchaincyf/AIpic](https://github.com/alchaincyf/AIpic)
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持与反馈

如果您遇到问题或有疑问：

1. 查看 [Issues](https://github.com/alchaincyf/AIpic/issues)
2. 创建新的Issue描述问题
3. 查看文档和示例
4. 联系魔搭社区获取技术支持

## 🏆 适用场景

- **网站开发**: 为网站自动生成所需图片素材
- **内容创作**: 为文章、博客生成配图
- **原型设计**: 快速生成设计概念图
- **教育培训**: 为教学内容生成示例图片
- **电商平台**: 生成产品展示图片
- **社交媒体**: 制作吸引人的视觉内容

## 🏷️ 版本历史

- **1.0.0** - 初始版本
  - 基础MCP服务器功能
  - 魔搭社区FLUX模型集成
  - 网页和文章分析
  - 批量图片生成
  - 支持npx直接运行
  - 完整的环境变量配置

## 🔗 相关链接

- [魔搭社区官网](https://modelscope.cn)
- [魔搭社区API密钥获取](https://modelscope.cn/my/myaccesstoken)
- [MCP协议文档](https://modelcontextprotocol.io)
- [Cursor编辑器](https://cursor.sh)
- [Claude Desktop](https://claude.ai/desktop) 