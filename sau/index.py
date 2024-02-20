
import os


def my_import(directory):
    with open(output_file, 'w') as output_file_w:
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                output_file_w.write(f"{file_path}\n")


root_directory = r"/home/vvn20206205/Desktop/vuvannghia/src"
output_file = r"/home/vvn20206205/Desktop/einvoice-system/sau/output.txt"
my_import(root_directory)

print(f"Kết quả đã được ghi vào tập tin {output_file}")


