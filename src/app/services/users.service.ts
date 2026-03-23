import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

export type IResponse = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: IUser[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  private httpClient = inject(HttpClient);

  private apiUrl: string = `${environment.apiUrl}`;

  private getUrl(id: string = ''): string{
    return id ? `${this.apiUrl}/${id}` : this.apiUrl;
  }

  getAll(page: number): Observable<IResponse> {
    const urlFinal = `${this.getUrl()}?page=${page}`;
    console.log(urlFinal);
    return this.httpClient.get<IResponse>(urlFinal);
  }

  getById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(this.getUrl(id));
  }

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.getUrl(), user);
  }

  updateUser(user: IUser, id: string): Observable<IUser> {
    return this.httpClient.put<IUser>(this.getUrl(id), user);
  }
  
  deleteById(id: string): Observable<IUser> {
    return this.httpClient.delete<IUser>(this.getUrl(id));
  }

}
