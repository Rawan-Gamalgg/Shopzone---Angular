import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of, debounceTime, switchMap } from 'rxjs';
import { AuthService } from '../services/authservice';

@Injectable({ providedIn: 'root' })
export class EmailNotFoundValidator {
  constructor(private authService: AuthService) {}

validate(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    return this.authService.getUserByEmail(control.value).pipe(
      map(users => users.length === 0 ? { emailNotFound: true } : null),
      catchError(() => of(null))
    );
  };
}
}