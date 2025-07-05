# NPM 发布指南

本指南将帮助您将AI Image Generator MCP Server发布到npm包管理器。

## 📋 发布前检查清单

### 1. 环境准备
- [x] Node.js 18+ 已安装
- [x] npm 已安装并更新到最新版本
- [x] 拥有npm账户（如果没有，请访问 https://www.npmjs.com/ 注册）

### 2. 项目准备
- [x] 代码已完成并测试
- [x] 项目已构建 (`npm run build`)
- [x] 所有必要文件存在：
  - [x] `package.json` - 包配置文件
  - [x] `README.md` - 项目说明文档
  - [x] `LICENSE` - 许可证文件
  - [x] `dist/` - 构建输出目录
  - [x] `.npmignore` - npm忽略文件

### 3. 包配置检查
- [x] 包名唯一且符合npm命名规范
- [x] 版本号正确（遵循语义化版本）
- [x] 描述清晰明确
- [x] 关键词设置合理
- [x] 入口文件正确指向 `dist/index.js`
- [x] bin字段正确配置
- [x] files字段包含所有必要文件

## 🚀 发布步骤

### 方法一：使用发布脚本（推荐）

1. **运行发布脚本**：
   ```bash
   chmod +x publish-npm.sh
   ./publish-npm.sh
   ```

2. **按照提示操作**：
   - 脚本会自动检查所有必要条件
   - 显示即将发布的包信息
   - 要求确认后执行发布

### 方法二：手动发布

1. **登录npm**：
   ```bash
   npm login
   ```
   按照提示输入用户名、密码和邮箱。

2. **检查登录状态**：
   ```bash
   npm whoami
   ```

3. **检查包名可用性**：
   ```bash
   npm view ai-image-generator-mcp
   ```
   如果返回404，说明包名可用。

4. **预览发布内容**：
   ```bash
   npm pack --dry-run
   ```

5. **发布包**：
   ```bash
   npm publish --access public
   ```

## 📦 包信息

- **包名**: `ai-image-generator-mcp`
- **版本**: `1.0.0`
- **类型**: 公开包
- **许可证**: MIT
- **主要文件**:
  - `dist/index.js` - 主程序文件
  - `dist/*.js` - 编译后的JavaScript文件
  - `README.md` - 项目文档
  - `LICENSE` - 许可证
  - `API_KEY_GUIDE.md` - API密钥配置指南
  - `USAGE_GUIDE.md` - 使用教程
  - `QUICK_SETUP.md` - 快速配置指南

## 🔧 发布后配置

### 1. 验证发布
发布成功后，您可以：
- 访问 https://www.npmjs.com/package/ai-image-generator-mcp
- 通过 `npm install -g ai-image-generator-mcp` 测试安装
- 检查包页面信息是否正确

### 2. 更新文档
- 在README中添加npm安装说明
- 添加版本徽章
- 更新安装和使用说明

### 3. 推广包
- 在相关社区分享
- 添加到MCP服务器列表
- 收集用户反馈

## 🏷️ 版本管理

### 语义化版本规范
- **主版本号 (Major)**: 不兼容的API修改
- **次版本号 (Minor)**: 向后兼容的功能性新增
- **修订号 (Patch)**: 向后兼容的问题修正

### 发布新版本
1. 更新版本号：
   ```bash
   npm version patch  # 修复bug
   npm version minor  # 新功能
   npm version major  # 破坏性更改
   ```

2. 重新发布：
   ```bash
   npm publish
   ```

## 🛠️ 常见问题

### 1. 包名已存在
**错误**: `npm ERR! 403 Forbidden`
**解决**: 
- 更改包名（在package.json中修改name字段）
- 或者使用scoped package: `@yourusername/ai-image-generator-mcp`

### 2. 版本号已存在
**错误**: `npm ERR! 403 You cannot publish over the previously published versions`
**解决**: 
- 增加版本号: `npm version patch`
- 然后重新发布

### 3. 未登录npm
**错误**: `npm ERR! 401 Unauthorized`
**解决**: 
- 运行 `npm login` 重新登录
- 检查登录状态: `npm whoami`

### 4. 网络问题
**错误**: `npm ERR! network`
**解决**: 
- 检查网络连接
- 尝试使用npm官方镜像: `npm config set registry https://registry.npmjs.org/`

## 📊 发布统计

发布后，您可以通过以下方式查看包的统计信息：
- npm包页面的下载统计
- `npm view ai-image-generator-mcp` 查看包信息
- 使用第三方工具如 npm-stat 查看详细统计

## 🎯 最佳实践

1. **定期更新**: 保持包的活跃度，及时修复bug和添加新功能
2. **文档完善**: 保持README和其他文档的更新
3. **版本控制**: 遵循语义化版本规范
4. **测试覆盖**: 确保代码质量
5. **社区互动**: 及时回应issues和pull requests

## 📞 获取帮助

如果在发布过程中遇到问题：
1. 查看npm官方文档: https://docs.npmjs.com/
2. 搜索相关错误信息
3. 在项目GitHub仓库创建issue
4. 联系npm支持团队

---

**注意**: 发布到npm后，包将对所有人可见和可下载。请确保代码质量和安全性。 