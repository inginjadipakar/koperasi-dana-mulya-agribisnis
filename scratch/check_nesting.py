with open('js/logistik.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos_form_tx = text.find('id="subtab-form-tx"')
pos_matrix = text.find('id="subtab-matrix"')

print("subtab-form-tx pos:", pos_form_tx)
print("subtab-matrix pos:", pos_matrix)

between = text[pos_form_tx:pos_matrix]
open_count = between.count('<div')
close_count = between.count('</div>')
print(f"Between form-tx and matrix: <div open: {open_count}, </div> close: {close_count}")
print(f"Net unclosed divs inside subtab-form-tx before subtab-matrix: {open_count - close_count}")
