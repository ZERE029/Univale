### CLASSE RESPONSÁVEL POR TRATAR ERROS RELACIONADOS AO CPF ###
class CPFError(Exception):
    """Erro base para problemas relacionados ao CPF."""
    pass


### CLASSE RESPONSÁVEL POR TRATAR CPF VAZIO ###
class CPFVazioError(CPFError):
    """Erro lançado quando o CPF não foi informado."""
    def __init__(self):
        super().__init__("O CPF não pode estar vazio.")


### CLASSE RESPONSÁVEL POR TRATAR CPF COM QUANTIDADE INCORRETA DE DÍGITOS ###
class CPFInvalidoError(CPFError):
    """Erro lançado quando o CPF não possui 11 dígitos."""
    def __init__(self):
        super().__init__("O CPF deve possuir exatamente 11 dígitos.")


### CLASSE RESPONSÁVEL POR TRATAR CPF COM FORMATO INVÁLIDO ###
class CPFFormatoError(CPFError):
    """Erro lançado quando o CPF possui caracteres inválidos."""
    def __init__(self):
        super().__init__("O CPF informado possui formato inválido.")