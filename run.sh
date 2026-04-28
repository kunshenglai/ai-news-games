#!/bin/bash
# AI 游戏部署脚本 - 支持本地测试和 GitHub Pages 发布
# 用法: ./run.sh [local|publish] [端口]

set -e

GAME_DIR="/tmp/ai-news-games"
SRC_DIR="/Users/ksl/Documents/obsidian/AI/研究项目/AI全自动生成休闲小游戏/games/2026-04-26-white-house-defense"

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  AI 游戏部署工具${NC}"
echo -e "${BLUE}========================================${NC}"

case "$1" in
    local|test)
        PORT=${2:-7000}
        
        echo -e "\n${GREEN}[1/2] 同步代码到本地仓库...${NC}"
        cp "$SRC_DIR/game.html" "$GAME_DIR/game.html"
        echo "✅ game.html 已同步"
        
        echo -e "\n${GREEN}[2/2] 启动本地服务器...${NC}"
        echo -e "📡 访问地址: ${YELLOW}http://ksl.eulergargantua.top:${PORT}${NC}"
        echo -e "💡 修改 game.html 后直接刷新浏览器即可看到效果\n"
        
        cd "$GAME_DIR"
        exec python3 server.py "$PORT"
        ;;
        
    publish|release|"")
        echo -e "\n${GREEN}[1/3] 同步代码到 GitHub 仓库...${NC}"
        cp "$SRC_DIR/game.html" "$GAME_DIR/game.html"
        echo "✅ game.html 已同步"
        
        echo -e "\n${GREEN}[2/3] 提交到 git...${NC}"
        cd "$GAME_DIR"
        git add -A
        git commit -m "$(date '+%Y-%m-%d %H:%M') - $(head -n 1 $GAME_DIR/game.html | grep -o 'v[0-9.]*' || echo 'update')" 2>/dev/null || echo "⚠️  无改动跳过"
        
        echo -e "\n${GREEN}[3/3] 推送到 GitHub...${NC}"
        git push
        echo -e "\n✅ 已推送到 GitHub Pages"
        echo -e "🌐 访问: ${YELLOW}https://kunshenglai.github.io/ai-news-games/game.html${NC}"
        echo -e "⏳ CDN 缓存约需 5-10 分钟生效"
        ;;
        
    *)
        echo "用法:"
        echo "  ./run.sh local [端口]    - 启动本地测试服务器"
        echo "  ./run.sh publish         - 发布到 GitHub Pages"
        echo "  ./run.sh                 - 等同于 publish"
        exit 1
        ;;
esac
