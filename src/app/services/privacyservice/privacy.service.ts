import { Injectable } from '@angular/core';
import { BaseUrl } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {
  private getPrivacyUrl = `${BaseUrl}/getPrivacy`;

  constructor(private http: HttpClient) { }

   private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      // If token is null, use an empty string to avoid passing null into the headers
      return new HttpHeaders({
        'x-access-token': token || '', // Ensure token is always a string
      });
    }
    getprivacy(): Observable<any> {

        const headers = this.getHeaders(); // Get the headers with the token
        return this.http.get<any>(this.getPrivacyUrl, { headers }); // Send the GET request with headers
      }
}
