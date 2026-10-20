import functools.wraps
from venv import logger
def log_execucao(func):
    @functools.wraps(func)
    def wrapper(*args,  **kwargs):
        logger.info("inicio: %s", func.__name__)
        resultado = func(*args, **kwargs)
        logger.info("fim: %s", func.__name__)
        return wrapper
@logger_execucao
def processar_pedido(pedido: Pedido) -> Recibo: