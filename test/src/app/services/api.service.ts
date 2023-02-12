import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/v1';

  sendMail(data: any) {
    return this.http.post<any>(`${this.baseUrl}/client/sendMail`, {id:data});
  }

  postClient(data: any) {
    return this.http.post<any>(`${this.baseUrl}/client`, data);
  }

  getClients() {
    return this.http.get<any>(`${this.baseUrl}/client/getAll`);
  }

  getClient() {
    return this.http.get<any>(`${this.baseUrl}/client/getOne/`);
  }

  putClient(data : any, id : number) {
    return this.http.put<any>(`${this.baseUrl}/client/update/`+id, data);
  }

  deleteClient(id : number) {
    return this.http.delete<any>(`${this.baseUrl}/client/delete/`+id);
  }

}
