

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Initialize the form with validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Keep these the same as in the form control
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getters for form fields for convenience in the template
  get email() {
    return this.loginForm.get('email');  // Use 'email' instead of 'userEmail'
  }

  get password() {
    return this.loginForm.get('password');  // Use 'password' instead of 'userPassword'
  }



  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Form values:', { email, password });
  
      // Send the login data object as before
      const loginData = {
        userEmail: email,
        userPassword: password
      };
  
      this.authService.login(loginData).subscribe(
        (response) => {
          console.log(response,'response');
          
          const token = response.data.userToken;  // Assuming the response contains the token
          localStorage.setItem('authToken', token);  // Save the token in localStorage
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
          this.router.navigate(['/dashboard']);  // Navigate to dashboard
        },
        (error) => {
          this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
          console.error('Login error:', error.error.message);
        }
      );
    } else {
      this.snackBar.open('Please fill in all fields correctly.', 'Close', { duration: 3000 });
    }
  }
  
}

