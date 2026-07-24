from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# L'URL de la base de données (on dit à SQLAlchemy de créer un fichier nommé pizzeria.db)
SQLALCHEMY_DATABASE_URL = "sqlite:///./pizzeria.db" # ./ signifie exactement "crée ce fichier ici-même, dans le dossier actuel".

# Le moteur de connexion (Engine)
engine = create_engine(             #  param "check_same_thread" spécificité obligatoire pour SQLite avec FastAPI
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}   
)   

# La fabrique de sessions (équivalent du SessionFactory de Hibernate)
# C'est ce qui nous permettra de faire des requêtes (ouvrir/fermer des transactions)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# La classe de base pour nos futurs modèles
# Toutes nos classes "Tables SQL" vont hériter de cette Base (comme l'annotation @Entity)
Base = declarative_base()

# Ouvrir et fermer la connexion lors d'une demande de pizza
def get_db():
    db = SessionLocal()
    try:
        # yield met la fonction en pause et donne la connexion à ta route
        yield db
    finally:
        # Quand la route a fini (ou même si elle plante !), on ferme la connexion proprement
        db.close()