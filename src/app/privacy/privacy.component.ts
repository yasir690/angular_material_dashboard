import { Component, OnInit } from '@angular/core';
import { PrivacyService } from '../services/privacyservice/privacy.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

interface PrivacyPolicyResponse {
  success: boolean;
  message: string;
  data: { privacypolicy: string }[]; // Array of objects containing privacypolicy
}
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent implements OnInit {
  privacyPolicyText: string = '';  // Variable to hold the fetched privacy policy

  constructor(private privacyService: PrivacyService,private snackBar: MatSnackBar) { }
    

  ngOnInit(): void {
    // Call the service to fetch the privacy policy on component initialization
    this.privacyService.getprivacy().subscribe(
      (data: PrivacyPolicyResponse) => {
        // Access the first element in the 'data' array and assign 'privacypolicy' value to the variable
        this.privacyPolicyText = data.data[0].privacypolicy;
        console.log(data, 'data');  // Log the data for debugging purposes
        this.snackBar.open(data.message, 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error fetching privacy policy', error);
      }
    );
  }
}
