import json

def lire_menu():
    with open("menu.json", "r", encoding="UTF-8") as fichier:
        return json.load(fichier)

def sauvegarder_menu(nouveau_menu):
    with open("menu.json", "w", encoding = "UTF-8") as fichier:
        json.dump(nouveau_menu, fichier, indent=4, ensure_ascii=False)