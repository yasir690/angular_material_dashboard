import { Injectable } from '@angular/core';
import { BaseUrl } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {
  private totalUserUrl = `${BaseUrl}/countUser`;
  private androidUserUrl = `${BaseUrl}/androiduser`;
  private iosUserUrl = `${BaseUrl}/iosuser`;
  private webUserUrl = `${BaseUrl}/webuser`;

  constructor(private http: HttpClient) { }

  // Function to create headers with the token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');  // Retrieve the token from localStorage
    // If token is null, use an empty string to avoid passing null into the headers
    return new HttpHeaders({
      'x-access-token': token || ''  // Ensure token is always a string
    });
  }

  countuser(): Observable<any> {
    const headers = this.getHeaders();  // Get the headers with the token
    return this.http.get<any>(this.totalUserUrl, { headers });  // Send the GET request with headers
  }

  androiduser(): Observable<any> {
    const headers = this.getHeaders();  // Get the headers with the token
    return this.http.get<any>(this.androidUserUrl, { headers });  // Send the GET request with headers
  }

  iosuser(): Observable<any> {
    const headers = this.getHeaders();  // Get the headers with the token
    return this.http.get<any>(this.iosUserUrl, { headers });  // Send the GET request with headers
  }

  webuser(): Observable<any> {
    const headers = this.getHeaders();  // Get the headers with the token
    return this.http.get<any>(this.webUserUrl, { headers });  // Send the GET request with headers
  }
}
