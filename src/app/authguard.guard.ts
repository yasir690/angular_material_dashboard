import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  // Injecting Router using Angular's inject function

  const token = localStorage.getItem('authToken');
  if (token) {
    return true; // User is authenticated, allow navigation
  } else {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false; // Block the navigation
  }
};
