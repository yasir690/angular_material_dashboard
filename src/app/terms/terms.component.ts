import { Component, OnInit } from '@angular/core';
import { TermsService } from '../services/termsservice/terms.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

interface termsResponse {
  success: boolean;
  message: string;
  data: { termsCondition: string }[]; // Array of objects containing privacypolicy
}
@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [
    MatCardModule,
        CommonModule
  ],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})
export class TermsComponent implements OnInit {
termText: string = '';  // Variable to hold the fetched privacy policy

  constructor(private termService: TermsService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Call the service to fetch the privacy policy on component initialization
    this.termService.getterms().subscribe(
      (data: termsResponse) => {
        // Access the first element in the 'data' array and assign 'privacypolicy' value to the variable
        this.termText = data.data[0].termsCondition;
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
