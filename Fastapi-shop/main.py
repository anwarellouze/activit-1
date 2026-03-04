from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# Création d'une instance FastAPI
app = FastAPI(title="API Accessoires Téléphoniques", version="1.0")

# Modèle de données pour un article
class Article(BaseModel):
    id: int
    nom: str
    description: str
    prix: float

# Base de données simulée (liste d'articles)
articles: List[Article] = [
    Article(id=1, nom="Coque iPhone 14", description="Coque silicone antichoc", prix=25.0),
    Article(id=2, nom="Chargeur rapide USB-C", description="Charge rapide 30W", prix=15.0),
    Article(id=3, nom="Écouteurs Bluetooth", description="Écouteurs sans fil avec micro", prix=40.0),
]

# Route pour récupérer tous les articles
@app.get("/articles", response_model=List[Article])
def get_articles():
    """
    Récupère la liste de tous les articles.
    """
    return articles

# Route pour récupérer un article par son ID
@app.get("/articles/{article_id}", response_model=Article)
def get_article(article_id: int):
    """
    Récupère un article spécifique via son ID.
    """
    for article in articles:
        if article.id == article_id:
            return article
    raise HTTPException(status_code=404, detail="Article non trouvé")

# Route pour ajouter un nouvel article
@app.post("/articles", response_model=Article)
def add_article(article: Article):
    """
    Ajoute un nouvel article à la liste.
    """
    articles.append(article)
    return article

# Route pour supprimer un article par ID
@app.delete("/articles/{article_id}")
def delete_article(article_id: int):
    """
    Supprime un article de la liste via son ID.
    """
    for i, article in enumerate(articles):
        if article.id == article_id:
            articles.pop(i)
            return {"message": "Article supprimé"}
    raise HTTPException(status_code=404, detail="Article non trouvé")