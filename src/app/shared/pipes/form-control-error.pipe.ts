import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formControlError',
  pure: false
})
export class FormControlErrorPipe implements PipeTransform {
  transform(control: AbstractControl | null): string {
    if (!!control && control.errors && (control.dirty || control.touched)) {
      return this._getErrorMessage(control.errors);
    }
    return '';
  }

  private _getErrorMessage(errors: ValidationErrors): string {
    switch (Object.keys(errors)[0]) {
      case 'required':
        return 'This field is required';
      case 'maxlength':
        return `Maximum input length is: ${errors.maxlength.requiredLength}`;
      default:
        return '';
    }
  }
}
