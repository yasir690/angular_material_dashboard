import { Injectable } from '@angular/core';
import { BaseUrl } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  private getUserUrl = `${BaseUrl}/getUser`;
  private updateUserUrl = `${BaseUrl}/updateUser`;
  private deleteUserUrl = `${BaseUrl}/deleteUser`;
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    // If token is null, use an empty string to avoid passing null into the headers
    return new HttpHeaders({
      'x-access-token': token || '', // Ensure token is always a string
    });
  }

  getuser(): Observable<any> {
    const headers = this.getHeaders(); // Get the headers with the token
    return this.http.get<any>(this.getUserUrl, { headers }); // Send the GET request with headers
  }

  updateuser(id: string, userData: any): Observable<any> {
    const headers = this.getHeaders(); // Get the headers with the token
    const updateUrl = `${this.updateUserUrl}/${id}`;  // Correctly concatenate the ID to the URL
    console.log('Updating user URL:', updateUrl);  // Check the URL to verify it's correct
    return this.http.put<any>(updateUrl, userData, { headers });
  }

  deleteuser(id: string): Observable<any> {
    const headers = this.getHeaders(); // Get the headers with the token
    const deleteUrl = `${this.deleteUserUrl}/${id}`;
    return this.http.delete<any>(deleteUrl,{headers});
  }
}
