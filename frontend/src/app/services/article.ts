import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://127.0.0.1:8000/articles';

  constructor(private http: HttpClient) {}

  // READ ALL
  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // CREATE
  addArticle(article: any): Observable<any> {
    return this.http.post(this.apiUrl, article);
  }

  // UPDATE
  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, article);
  }

  // DELETE
  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}