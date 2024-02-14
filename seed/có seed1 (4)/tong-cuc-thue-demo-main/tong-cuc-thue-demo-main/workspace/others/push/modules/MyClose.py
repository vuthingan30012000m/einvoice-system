import pyautogui


class MyClose():
    def CloseAll():

        pyautogui.hotkey('ctrl', 'k')
        pyautogui.hotkey('ctrl', 'w')

    def Terminal():
        pyautogui.hotkey('ctrl', 'j')

    def Target(number):
        pyautogui.hotkey('alt', f'{number}')

    def ScrollBar():
        pyautogui.hotkey('ctrl', 'shift', 'e')
        pyautogui.hotkey('ctrl', 'b')
