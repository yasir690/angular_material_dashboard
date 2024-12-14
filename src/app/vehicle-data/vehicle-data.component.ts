import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UserserviceService } from '../services/userservice/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VehicleserviceService } from '../services/vehicleservice/vehicleservice.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { EditVehicleDialogComponent } from '../edit-vehicle-dialog/edit-vehicle-dialog.component';
import { DeleteVehicleDialogComponent } from '../delete-vehicle-dialog/delete-vehicle-dialog.component';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
  ]
})
export class VehicleDataComponent implements OnInit {
  displayedColumns: string[] = ['id', 'make', 'model', 'actions']; // Columns to display
  vehicles: any[] = []; // Store vehicles
  currentVehicleId: string = '';
  loading: boolean = true;

  constructor(
    private vehicleService: VehicleserviceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getVehicle(); // Fetch vehicle data initially
  }

  getVehicle(): void {
    this.vehicleService.getvehicle().subscribe({
      next: (response) => {
        this.vehicles = response.data;
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        this.loading = false;
      },
      error: (err) => {
        this.snackBar.open('Error loading vehicle data');
        this.loading = false; // Set loading to false even if there is an error
      },
    });
  }

  // Edit vehicle function
  editVehicle(vehicle: any): void {
    console.log('Editing vehicle:', vehicle);

    const dialogRef = this.dialog.open(EditVehicleDialogComponent, {
      data: { vehicle } // Pass vehicle data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Vehicle saved:', result);
        console.log('Updated vehicle ID:', result._id); // Now this should print the correct ID

        if (result._id) {
          this.vehicleService.updatevehicle(result._id, result).subscribe({
            next: (response) => {
              // Find and update the vehicle in the local vehicles array
              const index = this.vehicles.findIndex(v => v._id === result._id);
              if (index !== -1) {
                this.vehicles[index] = result; // Replace the old vehicle with the updated one
                this.snackBar.open(response.message, 'Close', { duration: 3000 });

                // Reassign vehicles array to trigger Angular change detection
                this.vehicles = [...this.vehicles];
                this.cdr.detectChanges(); // Ensure change detection is triggered
              }
            },
            error: (err) => {
              console.error('Error updating vehicle:', err);
              this.snackBar.open('Error updating vehicle', 'Close', { duration: 3000 });
            }
          });
        } else {
          console.error('Vehicle ID (_id) is missing in the result:', result);
        }
      }
    });
  }

  // Delete vehicle function
  deleteVehicle(vehicle: any): void {
    console.log('Deleting vehicle:', vehicle);

    const dialogRef = this.dialog.open(DeleteVehicleDialogComponent, {
      data: { vehicleId: vehicle._id } // Pass only the vehicle._id to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result); // Should log the vehicleId

      if (result) {
        this.vehicleService.deletevehicle(result).subscribe({
          next: (response) => {
            console.log('Vehicle deleted successfully:', response);

            // After successful deletion, remove the vehicle from the local vehicles array
            const index = this.vehicles.findIndex(v => v._id === result);
            if (index !== -1) {
              this.vehicles.splice(index, 1); // Remove the vehicle from the array
              this.snackBar.open(response.message, 'Close', { duration: 3000 });

              // Reassign vehicles array to trigger Angular change detection
              this.vehicles = [...this.vehicles];
              this.cdr.detectChanges(); // Ensure change detection is triggered
            }
          },
          error: (err) => {
            console.error('Error deleting vehicle:', err);
            this.snackBar.open('Error deleting vehicle', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
