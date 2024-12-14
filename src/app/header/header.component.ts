import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
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
    CommonModule,
    RouterModule  
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
 
  sidenavOpened = false;  // Control the sidenav state

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router) {}

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;  // Toggle the sidenav state
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
