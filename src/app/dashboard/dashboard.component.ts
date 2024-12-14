import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardserviceService } from '../services/dashboardservice/dashboardservice.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
      MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        FlexLayoutModule,
        MatCardModule,
        CommonModule 
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0; 
  androidUsers: number = 0;
  iosUsers: number = 0;
  webUsers: number = 0;
  constructor(private dashboardservice:DashboardserviceService){}
  
ngOnInit(): void {
  this.fetchUserData();

}

 // Method to fetch data from the backend service
 fetchUserData(): void {
  // Fetch total users count
  this.dashboardservice.countuser().subscribe(
    (data) => {
      console.log(data,'data');
      
      this.totalUsers = data.data;  // Assuming 'data.count' contains the total count
    },
    (error) => {
      console.error('Error fetching total users:', error);
    }
  );

  // Fetch android users count
  this.dashboardservice.androiduser().subscribe(
    (data) => {
      console.log(data,'data');

      this.androidUsers = data.data;  // Assuming 'data.count' contains the count of android users
    },
    (error) => {
      console.error('Error fetching android users:', error);
    }
  );

  // Fetch ios users count
  this.dashboardservice.iosuser().subscribe(
    (data) => {
      console.log(data,'data');

      this.iosUsers = data.data;  // Assuming 'data.count' contains the count of iOS users
    },
    (error) => {
      console.error('Error fetching ios users:', error);
    }
  );

  // Fetch web users count
  this.dashboardservice.webuser().subscribe(
    (data) => {
      console.log(data,'data');

      this.webUsers = data.data;  // Assuming 'data.count' contains the count of web users
    },
    (error) => {
      console.error('Error fetching web users:', error);
    }
  );
}
}
