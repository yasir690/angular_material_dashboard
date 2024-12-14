import { Injectable } from "@angular/core";
import { BaseUrl } from "../../config/config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = `${BaseUrl}/userLogin`;

  constructor(private http: HttpClient) {}

  // Modify the method to accept a single object instead of separate email and password
  login(loginData: { userEmail: string, userPassword: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginData);  // Send the loginData object directly to the API
  }
}
