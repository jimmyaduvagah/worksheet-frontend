import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'asEmploymentType'})
export class EmploymentTypePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'EM') {
        return 'Employee';
    }
    if (value === 'CO') {
        return 'Contractor';
    }
  }

}
