import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent {
  user: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user }; // Initialize user data
  }

  onSave(): void {
    // Save the edited user (send data back to parent component)
    this.dialogRef.close(this.user);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
