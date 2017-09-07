import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'asBoolean'
})

export class BooleanPipe implements PipeTransform {

    transform(value: boolean) {
        return value ? 'Yes' : 'No';
    }
}

