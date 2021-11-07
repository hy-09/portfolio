import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
s_handler = logging.FileHandler("logs/debug.log", encoding="utf-8")
s_handler.setLevel(logging.DEBUG)
logger.addHandler(s_handler)
