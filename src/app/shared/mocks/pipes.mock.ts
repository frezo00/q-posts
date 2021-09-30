import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({ name: 'search' })
export class MockSearchPipe implements PipeTransform {
  transform(_items: any[] | null, _searchValue: string, _keys?: string[]): any[] | undefined {
    return [];
  }
}

@Pipe({ name: 'formControlError' })
export class MockFormControlErrorPipe implements PipeTransform {
  transform(_control: AbstractControl | null): string {
    return '';
  }
}
