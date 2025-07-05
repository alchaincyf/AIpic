#!/bin/bash

# AI图片生成MCP Server启动脚本

echo "🚀 启动AI图片生成MCP Server..."

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: Node.js未安装。请先安装Node.js 18.x或更高版本。"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: npm未安装。请先安装npm。"
    exit 1
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 检查是否需要编译
if [ ! -d "dist" ] || [ "src" -nt "dist" ]; then
    echo "🔨 编译TypeScript..."
    npm run build
fi

# 启动服务器
echo "✅ 启动服务器..."
npm start 