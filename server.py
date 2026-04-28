#!/usr/bin/env python3
"""
本地开发服务器 - 自动添加版本号绕过 CDN 缓存
用法: python3 server.py [端口]
默认端口: 7000
"""
import http.server
from http.server import ThreadingHTTPServer
import sys
import os
import re
import time
import signal

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 7000
VERSION = f"v{time.strftime('%H%M%S')}"  # 每次启动生成新时间戳版本

# 忽略 SIGHUP，防止终端断开时进程被杀死
signal.signal(signal.SIGHUP, signal.SIG_IGN)

class AutoVersionHandler(http.server.SimpleHTTPRequestHandler):
    """自动给 HTML 注入版本号参数，所有响应设置 no-cache"""
    
    def end_headers(self):
        """在所有响应头中添加 no-cache 指令"""
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # 对 HTML 文件动态添加版本号
        if self.path.endswith('.html') or self.path == '/':
            filepath = self.translate_path(self.path)
            if os.path.isfile(filepath):
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # 注入版本号到 <div id="version"> 和 setVersion() 调用
                # Append timestamp to version number, e.g. v5.4.1 -> v5.4.1-dev-1940
                ts = time.strftime('%H%M%S')
                content = re.sub(r'(v\d+\.\d+\.\d+)', r'\1-dev-' + ts, content)
                
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                # no-cache 由 end_headers 自动添加
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                return
        
        # 其他文件走默认处理（end_headers 会自动添加 no-cache）
        super().do_GET()
    
    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")

print(f"🚀 本地服务器启动: http://ksl.eulergargantua.top:{PORT}")
print(f"📦 版本号: {VERSION}-dev (每次启动自动生成)")
print(f"🔄 所有响应已设置 no-cache，修改后直接刷新即可生效")
print(f"⏹  按 Ctrl+C 停止服务")
print()

ThreadingHTTPServer.allow_reuse_address = True
with ThreadingHTTPServer(("", PORT), AutoVersionHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 服务已停止")
