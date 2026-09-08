import re

with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the closing tag after line 1834
target = '''            </div>
          </div>

          <!-- SUB-TAB 2: MATRIKS REKAP SHEET BULAN INI -->'''

replacement = '''            </div>
          </div>
        </div>

        <!-- SUB-TAB 2: MATRIKS REKAP SHEET BULAN INI -->'''

if target in text:
    print("Found target block to fix!")
    new_text = text.replace(target, replacement, 1)
    
    # Check net unclosed divs in new_text
    pos_form_tx = new_text.find('id="subtab-form-tx"')
    pos_matrix = new_text.find('id="subtab-matrix"')
    between = new_text[pos_form_tx:pos_matrix]
    open_count = between.count('<div')
    close_count = between.count('</div>')
    print(f"NEW Between form-tx and matrix: <div open: {open_count}, </div> close: {close_count}")
    print(f"NEW Net unclosed divs inside subtab-form-tx: {open_count - close_count}")
else:
    print("Target block not found!")
