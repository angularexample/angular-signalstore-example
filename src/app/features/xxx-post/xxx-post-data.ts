import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { XxxPostType } from './xxx-post-types';

@Injectable({
  providedIn: 'root'
})
export class XxxPostData {
  private http: HttpClient = inject(HttpClient);

  getPosts(userId: number): Observable<XxxPostType[]> {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    return this.http.get<XxxPostType[]>(url);
  }

  updatePost(post: XxxPostType): Observable<XxxPostType> {
    const url = `https://jsonplaceholder.typicode.com/posts/${post.id}`;
    return this.http.put<XxxPostType>(url, post);
  }
}
