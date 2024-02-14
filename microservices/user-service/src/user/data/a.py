import pandas as pd

# Đọc dữ liệu từ file Excel
df = pd.read_excel('Chuyển DiaChi.xlsx')

# Chuyển đổi DataFrame thành JSON
json_data = df.to_json(orient='records')

# Lưu JSON vào một tệp
with open('output.json', 'w') as f:
    f.write(json_data)
