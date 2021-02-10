import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function notInValidator(notIn: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Check if the value is invalid.
    if (notIn.indexOf(control.value) >= 0) {
      // Return an error named after the validator if that is the case.
      return {
        notIn: { value: control.value }
      };
    }
    // Otherwise, all is well, there is no error.
    return null;
  };
}