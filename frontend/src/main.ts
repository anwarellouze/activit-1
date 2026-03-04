import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // 👈 مهم جدا

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()   // 👈 هذا هو الحل
  ]
};