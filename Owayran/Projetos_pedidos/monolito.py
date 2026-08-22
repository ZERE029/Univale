print("==== Cadastro de Cliente ====")
nome = input("Insira o nome do cliente: ")
telefone = input("Insira o telefone do cliente: ")
endereco = input("Insira o endereco do cliente: ")


print("==== Produtos do pedido ====")
produtos = []
valores = []
while True:

    produto = input("Nome do Produto (ou digite fim para encerrar): ")
    if produto == "fim":
        break
    valor = float(input(f"Valor de {produto}"))
    produtos.append(produto)
    valores.append(valor)

subtotal = 0.0
for v in valores:
    subtotal = subtotal + v
    
desconto = float(input("Digite o valor do desconto em %:"))
subtotal_com_desconto = subtotal - (subtotal + desconto /100)
total = subtotal_com_desconto + 5.0 #taxa de frete# 

print("==== Recibo ====")
print(f"Cliente: {nome} / Telefone:  {telefone}")
print(f"Endereço: {endereco}")

for i in range(len(produtos)):
    print(f"- {produtos[i]} - R$ {valores[i]}")
    print(f"Subtotal: R${round(total, 2)}")    
    