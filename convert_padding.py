import re

# CSSファイルを読み込み
with open('css/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# padding の px を rem に変換（16px = 1rem）
conversions = {
    # 複数値のpadding（順序重要：具体的なものから）
    r'padding:\s*80px\s+20px': 'padding: 5rem 1.25rem',
    r'padding:\s*80px\s+0': 'padding: 5rem 0',
    r'padding:\s*15px\s+20px': 'padding: 0.9375rem 1.25rem',
    r'padding:\s*10px\s+40px': 'padding: 0.625rem 2.5rem',
    r'padding:\s*10px\s+20px': 'padding: 0.625rem 1.25rem',
    r'padding:\s*10px\s+15px': 'padding: 0.625rem 0.9375rem',
    r'padding:\s*10px\s+0': 'padding: 0.625rem 0',
    r'padding:\s*0\s+200px': 'padding: 0 12.5rem',
    
    # 単一値のpadding
    r'padding:\s*200px': 'padding: 12.5rem',
    r'padding:\s*120px': 'padding: 7.5rem',
    r'padding:\s*100px': 'padding: 6.25rem',
    r'padding:\s*80px': 'padding: 5rem',
    r'padding:\s*70px': 'padding: 4.375rem',
    r'padding:\s*60px': 'padding: 3.75rem',
    r'padding:\s*50px': 'padding: 3.125rem',
    r'padding:\s*40px': 'padding: 2.5rem',
    r'padding:\s*30px': 'padding: 1.875rem',
    r'padding:\s*20px': 'padding: 1.25rem',
    r'padding:\s*15px': 'padding: 0.9375rem',
    r'padding:\s*10px': 'padding: 0.625rem',
    
    # padding-top
    r'padding-top:\s*120px': 'padding-top: 7.5rem',
    r'padding-top:\s*70px': 'padding-top: 4.375rem',
    r'padding-top:\s*40px': 'padding-top: 2.5rem',
    
    # padding-left
    r'padding-left:\s*120px': 'padding-left: 7.5rem',
    r'padding-left:\s*40px': 'padding-left: 2.5rem',
    
    # padding-right
    r'padding-right:\s*40px': 'padding-right: 2.5rem',
    
    # padding-bottom
    r'padding-bottom:\s*10px': 'padding-bottom: 0.625rem',
}

# 変換を適用
for pattern, replacement in conversions.items():
    content = re.sub(pattern, replacement, content)

# ファイルに書き込み
with open('css/style.css', 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Padding conversion completed!")
