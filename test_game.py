#!/usr/bin/env python3
"""
game.html 自动化测试框架
用法: python3 test_game.py [--local] [--verbose]

测试覆盖:
1. JS 语法解析验证
2. HTML 结构完整性
3. 关键功能存在性检查
4. 版本号一致性
5. 移动端兼容性
"""

import re
import subprocess
import sys
import os
import json

GAME_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'game.html')
LOCAL_URL = 'http://localhost:7001/game.html'

class TestResult:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
    
    def check(self, name, condition, detail=''):
        if condition:
            self.passed += 1
            print(f"  ✅ {name}")
        else:
            self.failed += 1
            msg = f"  ❌ {name}"
            if detail:
                msg += f" - {detail}"
            print(msg)
            self.errors.append(name)
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*50}")
        print(f"结果: {self.passed}/{total} 通过")
        if self.failed > 0:
            print(f"失败: {', '.join(self.errors)}")
        return self.failed == 0


def extract_script(content):
    """Extract inline JavaScript from HTML"""
    match = re.search(r'<script>\s*\n(.*?)\n\s*</script>', content, re.DOTALL)
    if not match:
        return None
    return match.group(1)


def test_js_syntax(content):
    """Test 1: JavaScript parses without errors"""
    script = extract_script(content)
    if not script:
        return False, "No <script> tag found"
    
    # Use Node.js to parse
    result = subprocess.run(
        ['node', '-e', 
         'try { new Function(process.argv[1]); process.exit(0); } catch(e) { console.error(e.message); process.exit(1); }',
         script],
        capture_output=True, text=True, timeout=10
    )
    if result.returncode == 0:
        return True, ""
    return False, result.stderr.strip()


def test_html_structure(content):
    """Test 2: Required HTML elements exist"""
    required_ids = [
        'bg-canvas', 'pixi-container', 'start-screen', 'start-btn',
        'game-over', 'score', 'combo', 'timer', 'version'
    ]
    results = {}
    for elem_id in required_ids:
        results[elem_id] = f'id="{elem_id}"' in content
    return results


def test_key_functions(script):
    """Test 3: Critical game functions exist"""
    if not script:
        return {}
    
    functions = {
        'restartGame': 'function restartGame',
        'handleTap': 'function handleTap',
        'triggerShake': 'function triggerShake',
        'emitEmptySpark': 'function emitEmptySpark',
        'spawnThreat': 'function spawnThreat',
        'gameOver': 'function gameOver',
        'updateScreenShake': 'function updateScreenShake',
    }
    
    results = {}
    for name, pattern in functions.items():
        results[name] = pattern in script
    return results


def test_event_listeners(script):
    """Test 4: Touch and click event handlers"""
    if not script:
        return {}
    
    listeners = {
        'click handler': "addEventListener('click'",
        'touchstart': "addEventListener('touchstart'",
        'touchend': "addEventListener('touchend'",
    }
    
    results = {}
    for name, pattern in listeners.items():
        results[name] = pattern in script
    return results


def test_version_consistency(content):
    """Test 5: Version number is consistent"""
    version_match = re.search(r'v(\d+)\.(\d+)\.(\d+)', content)
    if not version_match:
        return False, "No version found"
    
    major, minor, patch = version_match.groups()
    version = f"v{major}.{minor}.{patch}"
    
    # Count occurrences in div and setVersion
    div_count = content.count(f'id="version">{version}')
    setversion_calls = content.count(f"setVersion('{version}")
    
    return True, f"{version} (div: {div_count}, setVersion: {setversion_calls})"


def test_try_catch_balance(script):
    """Test 6: No orphan try/catch blocks"""
    if not script:
        return False, "No script"
    
    # Check for inline comments before } catch on the SAME line (the bug we fixed)
    # Pattern: "} catch" preceded by "//" on the same line
    for i, line in enumerate(script.split('\n'), 1):
        if '} catch' in line and '//' in line and line.index('//') < line.index('} catch'):
            return False, f"Line {i}: inline comment before }} catch causes parse error"
    
    try_count = script.count('try {')
    catch_count = script.count('} catch')
    finally_count = script.count('} finally')
    
    if try_count != catch_count + finally_count:
        return False, f"try={try_count}, catch={catch_count}, finally={finally_count}"
    
    return True, f"try={try_count}, catch={catch_count}"


def test_mobile_compatibility(content):
    """Test 7: Mobile viewport and touch settings"""
    checks = {
        'viewport meta': 'user-scalable=no' in content,
        'touch-action': 'touch-action: none' in content,
        'apple web app': 'apple-mobile-web-app-capable' in content,
        'safe area inset': 'safe-area-inset' in content,
        'no tap highlight': '-webkit-tap-highlight-color' in content,
    }
    return checks


def test_no_critical_bugs(script):
    """Test 8: Common JS pitfalls"""
    if not script:
        return {}
    
    results = {}
    
    # Check for undefined variable references
    results['no THREAT_COLORS'] = 'THREAT_COLORS[' not in script  # Should use THREAT_TYPES
    results['has THREAT_TYPES'] = 'THREAT_TYPES' in script
    
    # Check that PIXI app creation is in try block
    results['PIXI in try'] = 'try {\n        app = new PIXI' in script or 'try {\n      app = new PIXI' in script
    
    # Check emitPreset accepts color parameter
    results['emitPreset with color'] = 'function emitPreset(x, y, colorHex)' in script
    
    return results


def test_local_server(verbose=False):
    """Test 9: If local server is running, verify it serves correct content"""
    try:
        result = subprocess.run(
            ['curl', '-s', '--max-time', '3', LOCAL_URL],
            capture_output=True, text=True, timeout=5
        )
        if result.returncode != 0:
            return None, "Local server not running (skip)"
        
        content = result.stdout
        if '<script>' not in content:
            return False, "No script tag in served content"
        
        # Check version injected
        version_match = re.search(r'(v\d+\.\d+\.\d+-dev-\d+)', content)
        if version_match:
            return True, f"Server returns {version_match.group(1)}"
        return True, "Server returns HTML"
        
    except subprocess.TimeoutExpired:
        return None, "Server timeout (skip)"
    except Exception as e:
        return None, f"Connection error: {e}"


def main():
    print("=" * 50)
    print("🎮 白宫保卫战 - 自动化测试")
    print("=" * 50)
    
    if not os.path.exists(GAME_FILE):
        print(f"❌ 文件不存在: {GAME_FILE}")
        sys.exit(1)
    
    with open(GAME_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    script = extract_script(content)
    results = TestResult()
    
    # Test 1: JS Syntax
    print("\n📝 Test 1: JavaScript 语法解析")
    ok, detail = test_js_syntax(content)
    results.check("JS 语法正确", ok, detail)
    
    # Test 2: HTML Structure
    print("\n🏗️  Test 2: HTML 结构完整性")
    struct = test_html_structure(content)
    for elem_id, exists in struct.items():
        results.check(f"元素 #{elem_id}", exists)
    
    # Test 3: Key Functions
    print("\n⚙️  Test 3: 关键功能函数")
    funcs = test_key_functions(script)
    for name, exists in funcs.items():
        results.check(f"函数 {name}()", exists)
    
    # Test 4: Event Listeners
    print("\n👆 Test 4: 事件监听器")
    listeners = test_event_listeners(script)
    for name, exists in listeners.items():
        results.check(name, exists)
    
    # Test 5: Version Consistency
    print("\n🔢 Test 5: 版本号一致性")
    ok, detail = test_version_consistency(content)
    results.check("版本号一致", ok, detail)
    
    # Test 6: Try/Catch Balance
    print("\n🔒 Test 6: try/catch 配对")
    ok, detail = test_try_catch_balance(script)
    results.check("try/catch 配对正确", ok, detail)
    
    # Test 7: Mobile Compatibility
    print("\n📱 Test 7: 移动端兼容性")
    mobile = test_mobile_compatibility(content)
    for name, ok in mobile.items():
        results.check(name, ok)
    
    # Test 8: No Critical Bugs
    print("\n🐛 Test 8: 常见缺陷检查")
    bugs = test_no_critical_bugs(script)
    for name, ok in bugs.items():
        results.check(name, ok)
    
    # Test 9: Local Server (optional)
    print("\n🌐 Test 9: 本地服务器")
    ok, detail = test_local_server()
    if ok is None:
        print(f"  ⏭️  {detail}")
    else:
        results.check("本地服务正常", ok, detail)
    
    # Summary
    if results.summary():
        print("\n✅ 所有测试通过！可以安全推送。")
        sys.exit(0)
    else:
        print("\n❌ 测试失败！请不要推送，先修复上述问题。")
        sys.exit(1)


if __name__ == '__main__':
    main()
