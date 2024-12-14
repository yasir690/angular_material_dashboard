import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';  // Correct import for MatSidenavModule
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { UserDataComponent } from './user-data/user-data.component';
import { VehicleDataComponent } from './vehicle-data/vehicle-data.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,  // Import MatSidenavModule, not MatSidenav
    FlexLayoutModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    NotfoundpageComponent,
    UserDataComponent,
    VehicleDataComponent,
    LoginComponent,
    HttpClientModule // Ensure HttpClientModule is imported here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isNotFound: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the Not Found page
        this.isNotFound = this.router.url === '/not-found'; // Check if URL matches your 404 route
        if (this.sidenav) {
          this.sidenav.close(); // Ensure sidenav is closed when route changes
        }
      }
    });
  }

  ngAfterViewInit() {
    // Delay the sidenav toggle to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      if (this.sidenav) {
        this.sidenav.toggle();
      }
      this.cdr.detectChanges(); // Trigger change detection manually
    }, 0);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login'; // Check if the current route is login
  }

  isNotFoundPage(): boolean {
    return this.isNotFound; // Check if it's the Not Found page
  }
}
