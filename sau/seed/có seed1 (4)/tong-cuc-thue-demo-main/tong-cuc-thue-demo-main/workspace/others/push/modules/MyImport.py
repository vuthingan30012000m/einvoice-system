from modules.MyExecute import MyExecute


class MyImport:

    def Import():
        cmd = f"git config --global user.name 'VuVanNghia 20206205' "
        MyExecute(cmd)
        cmd = f"git config --global user.email 'nghiavu2k2abc@gmail.com'"
        MyExecute(cmd)
        cmd = f"pip install --upgrade pip"
        MyExecute(cmd)
        cmd = f"pip install pyautogui"
        MyExecute(cmd)
        cmd = f"pip install colorama"
        MyExecute(cmd)
