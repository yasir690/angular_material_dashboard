import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    importProvidersFrom(BrowserAnimationsModule),  // <-- Correct place for BrowserAnimationsModule
    importProvidersFrom(HttpClientModule), // Ensure HttpClientModule is provided here
  ]
}).catch((err) => console.error(err));
