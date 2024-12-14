import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { UserserviceService } from '../services/userservice/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule
  ],
})
export class UserDataComponent implements OnInit {
  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  displayedColumns: string[] = ['id', 'name', 'email', 'actions']; // Add 'actions' column
  users: any[] = []; // Store users
  loading: boolean = true;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getuser().subscribe({
      next: (response) => {
        this.users = response.data;
        this.snackBar.open(response.message, 'Close', {
          duration: 3000,
        });
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open('Error loading users data');
        this.loading = false; // Set loading to false even if there is an error
      },
    });
  }

  // Edit user function
  editUser(user: any): void {
    console.log('Editing user:', user);

    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user } // Pass user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User saved:', result);
        console.log('Updated user ID:', result._id); // Updated ID should be logged here

        if (result._id) {
          this.userService.updateuser(result._id, result).subscribe({
            next: (response) => {
              // Update the user in the local users array
              const index = this.users.findIndex(u => u._id === result._id);
              if (index !== -1) {
                this.users[index] = result; // Replace the old user with the updated user
                this.snackBar.open(response.message, 'Close', { duration: 3000 });
                // Reassign users array to trigger Angular change detection
                this.users = [...this.users];
                this.cdr.markForCheck(); // Ensure change detection is triggered
              }
            },
            error: (err) => {
              console.error('Error updating user:', err);
              this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  // Delete user function
  deleteUser(user: any): void {
    console.log('Deleting user:', user);

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { userId: user._id } // Pass only the user._id to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result); // Logs userId after dialog closure

      if (result) {
        this.userService.deleteuser(result).subscribe({
          next: (response) => {
            console.log('User deleted successfully:', response);

            // After successful deletion, remove the user from the local users array
            const index = this.users.findIndex(u => u._id === result);
            if (index !== -1) {
              this.users.splice(index, 1); // Remove the user from the array
              this.snackBar.open(response.message, 'Close', { duration: 3000 });
              // Reassign users array to trigger Angular change detection
              this.users = [...this.users];
              this.cdr.markForCheck(); // Ensure change detection is triggered
            }
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
