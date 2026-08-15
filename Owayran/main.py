
from func import normalizar_cpf


try:
    cpf = 5330
    print(normalizar_cpf(cpf))
    
except(ValueError, TypeError) as e:
    print(f"Erro de processamento, {e}")