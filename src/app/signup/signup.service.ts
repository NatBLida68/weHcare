import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }

  static ageValidator(control: FormControl) {
    if (control.value) {
        const matches = control.value.match(/^[A-Za-z\s]+$/);
        return matches ? null : { 'invalidName': true };
    } else {
        return null;
    }
}
}
