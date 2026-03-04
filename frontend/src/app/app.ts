import { Component, signal, OnInit, computed } from '@angular/core';
import { ArticleService } from './services/article';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [ArticleService]
})
export class App implements OnInit {
  articles = signal<any[]>([]);
  searchTerm = signal('');
  filteredArticles = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.articles().filter(a => 
      a.name.toLowerCase().includes(term) || 
      a.description.toLowerCase().includes(term)
    );
  });
  
  newArticle = { id: 0, name: '', price: 0, description: '' };

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        console.log('Data loaded:', data);
        this.articles.set(data);
      },
      error: (err) => console.error('Erreur API:', err)
    });
  }

  onSearch(event: any) {
    this.searchTerm.set(event.target.value);
  }

  addArticle() {
    console.log('Attempting to add:', this.newArticle);
    if (!this.newArticle.name.trim() || this.newArticle.price <= 0) {
      alert('Veuillez remplir les champs correctement');
      return;
    }
    this.articleService.addArticle(this.newArticle).subscribe({
      next: () => {
        this.loadArticles();
        this.resetForm();
      },
      error: (err) => alert('Erreur lors de l\'ajout')
    });
  }

  editArticle(article: any) {
    this.newArticle = { ...article };
  }

  updateArticle() {
    this.articleService.updateArticle(this.newArticle.id, this.newArticle).subscribe(() => {
      this.loadArticles();
      this.resetForm();
    });
  }

  deleteArticle(id: number) {
    if(confirm('Supprimer cet article ?')) {
      this.articleService.deleteArticle(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }

  resetForm() {
    this.newArticle = { id: 0, name: '', price: 0, description: '' };
  }
}