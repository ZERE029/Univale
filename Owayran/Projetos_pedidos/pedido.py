def cadastrar_cliente():
    nome = input("Insira o nome do cliente: ")
    telefone = input("Insira o telefone do cliente: ")
    endereco = input("Insira o endereco do cliente: ")
    return {"nome": nome , "telefone": telefone, "endereco": endereco}

def cadastrar_produtos():
    produtos = []
    while True:
         produto = input("Nome do Produto (ou digite fim para encerrar): ")
         if produto == "fim":
          break
         valor = float(input(f"Valor de {produto}: "))
         produtos.append({"nome": produto, "valor": valor} )
    return produtos
    
def calcular_total(valores):
    subtotal = sum(valores)
    taxa_entrega = 5.0
    total = subtotal + taxa_entrega
    return subtotal, total

def emitir_recibo(cliente, produtos, subtotal, total):
    print("==== Recibo ====")
    print(f"Cliente: {cliente['nome']} - {cliente['telefone']}")
    print(f"Endereço: {cliente['endereco']}")
    for p in produtos:
        print(f"- {p['nome']}: R$ {p['valor']:.2f}")
    print(f"Subtotal: {subtotal:.2f}")
    print(f"Total a Pagar: {total:.2f}")

cliente  = cadastrar_cliente()
produtos = cadastrar_produtos()
valores = [p['valor'] for p in produtos]
subtotal, total = calcular_total(valores)
emitir_recibo(cliente, produtos, subtotal, total)