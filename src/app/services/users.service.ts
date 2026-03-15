import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse, IUser } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  private httpClient = inject(HttpClient);

  private apiUrl: string = `${environment.apiUrl}`;

  private getUrl(id: string = ''): string{
    return id ? `${this.apiUrl}/${id}` : this.apiUrl;
  }

  getAll(url: string = ''): Observable<IResponse> {
    const urlFinal = url || this.getUrl();
    return this.httpClient.get<IResponse>(urlFinal);
  }

  getById(id: string): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.getUrl(id));
  }

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.getUrl(), user);
  }

  updateUser(user: IUser, id: string): Observable<IUser> {
    return this.httpClient.put<IUser>(this.getUrl(id), user);
  }
  
  deleteById(id: string): Observable<IResponse> {
    return this.httpClient.delete<IResponse>(this.getUrl(id));
  }

}
