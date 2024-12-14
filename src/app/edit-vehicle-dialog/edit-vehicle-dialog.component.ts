import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-edit-vehicle-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
        MatFormFieldModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        FormsModule
  ],
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrl: './edit-vehicle-dialog.component.css'
})
export class EditVehicleDialogComponent {
  vehicle: any;
   constructor(
      public dialogRef: MatDialogRef<EditUserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.vehicle = { ...data.vehicle }; // Initialize user data
    }
    onSave(): void {
      // Save the edited user (send data back to parent component)
      this.dialogRef.close(this.vehicle);
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
}
