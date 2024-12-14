import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({

  selector: 'app-delete-user-dialog',
  standalone:true,
  imports:[
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string } // Receive the userId
  ) {}

  // Method to confirm deletion
  onConfirmDelete(): void {
    this.dialogRef.close(this.data.userId); // Return the userId to the parent component
  }

  // Method to cancel deletion
  onCancel(): void {
    this.dialogRef.close(null); // Close the dialog without passing any value
  }
}
