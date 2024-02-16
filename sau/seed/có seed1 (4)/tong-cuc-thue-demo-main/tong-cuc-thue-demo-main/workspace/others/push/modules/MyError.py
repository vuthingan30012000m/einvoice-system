from colorama import Fore, init
init(autoreset=True)


def MyError(string):
    print(f"{Fore.RED}{string}")
