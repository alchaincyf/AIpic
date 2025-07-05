# 快速发布命令参考

## 🚀 一键发布到npm

### 方法1：使用发布脚本（推荐）
```bash
./publish-npm.sh
```

### 方法2：手动发布
```bash
# 1. 登录npm
npm login

# 2. 检查包名可用性
npm view ai-image-generator-mcp

# 3. 预览发布内容
npm pack --dry-run

# 4. 发布包
npm publish --access public
```

## 📋 发布前检查

```bash
# 确保项目已构建
npm run build

# 检查构建输出
ls -la dist/

# 验证包配置
cat package.json | grep -E "(name|version|main|bin)"

# 检查文件权限
ls -la dist/index.js
```

## 🔧 常用命令

### 版本管理
```bash
# 查看当前版本
npm version

# 升级版本
npm version patch    # 1.0.0 -> 1.0.1
npm version minor    # 1.0.0 -> 1.1.0
npm version major    # 1.0.0 -> 2.0.0

# 发布新版本
npm publish
```

### 包管理
```bash
# 查看包信息
npm view ai-image-generator-mcp

# 查看包文件
npm view ai-image-generator-mcp files

# 查看包依赖
npm view ai-image-generator-mcp dependencies

# 撤销发布（仅限72小时内）
npm unpublish ai-image-generator-mcp@1.0.0
```

### 测试安装
```bash
# 全局安装
npm install -g ai-image-generator-mcp

# 检查安装
which ai-image-generator-mcp

# 测试运行
ai-image-generator-mcp --help

# 卸载
npm uninstall -g ai-image-generator-mcp
```

## 🛠️ 故障排除

### 登录问题
```bash
# 检查登录状态
npm whoami

# 重新登录
npm logout
npm login

# 检查npm配置
npm config list
```

### 权限问题
```bash
# 检查包权限
npm owner ls ai-image-generator-mcp

# 添加协作者
npm owner add <username> ai-image-generator-mcp
```

### 网络问题
```bash
# 检查npm注册表
npm config get registry

# 重置为官方注册表
npm config set registry https://registry.npmjs.org/

# 清除缓存
npm cache clean --force
```

## 📊 发布后验证

```bash
# 检查包页面
open https://www.npmjs.com/package/ai-image-generator-mcp

# 测试全局安装
npm install -g ai-image-generator-mcp

# 验证可执行文件
ai-image-generator-mcp --version

# 检查包统计
npm view ai-image-generator-mcp --json
```

## 🎯 一键发布流程

复制以下命令，一次性完成发布：

```bash
# 构建项目
npm run build && \
# 运行发布脚本
./publish-npm.sh && \
# 验证发布
echo "✅ 发布完成！访问 https://www.npmjs.com/package/ai-image-generator-mcp 查看包信息"
```

## 📝 发布清单

发布前请确认：
- [ ] 代码已提交到Git
- [ ] 版本号正确
- [ ] 构建成功
- [ ] 文档完整
- [ ] 已登录npm
- [ ] 包名可用
- [ ] 测试通过

---

**准备就绪？运行 `./publish-npm.sh` 开始发布！** 🚀 