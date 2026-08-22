def somar_items(*valores):
    print(f"Recebi estes valores: {valores}")
    return sum(valores)
print(somar_items(10, 20, 30)) # 3 valores
print(somar_items(10, 20)) # 2 valores
print(somar_items(10, 20, 60, 67, 90 )) # 5 valores