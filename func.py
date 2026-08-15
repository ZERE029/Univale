import re


### FUNÇÃO RESPONSÁVEL POR NORMALIZAR O CPF E RETORNAR O CPF LIMPO DE CARACTERES QUE NÃO SÃO DÍGITOS, UTILIZANDO REGEX ###
def normalizar_cpf(cpf: str) -> str:
    if not cpf == str:
        raise TypeError(f"Erro de tipo: O tipo informado de cpf [{cpf}] no corresponde com o esperado")
    
    """
    Args:
        cpf (str): CPF que será normalizado, podendo conter pontos, traços e outros caracteres.

    saída:
        str: Retorna o CPF contendo somente os dígitos.
    """
    return re.sub(r"\D", "", cpf)


### FUNÇÃO RESPONSÁVEL POR VALIDAR SE O CPF POSSUI EXATAMENTE 11 DÍGITOS ###
def validar_cpf(cpf: str) -> bool:
    """
    Args:
        cpf (str): CPF que será verificado.

    saída:
        bool: Retorna True caso o CPF possua exatamente 11 dígitos.
              Retorna False caso o CPF não possua exatamente 11 dígitos
              ou contenha caracteres que não sejam números.
    """
    return len(cpf) == 11 and cpf.isdigit()


### FUNÇÃO RESPONSÁVEL POR CADASTRAR O CLIENTE APÓS NORMALIZAR E VALIDAR O CPF ###
def cadastrar_cliente(cpf: str) -> str:
    """
    Args:
        cpf (str): CPF do cliente que será cadastrado.

    saída:
        str: Retorna o CPF normalizado após a validação.

    erro:
        ValueError: Lança um erro caso o CPF informado seja inválido.
    """
    cpf = normalizar_cpf(cpf)

    if not validar_cpf(cpf):
        raise ValueError("CPF inválido")

    return cpf