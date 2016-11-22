import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  // disable validation errors
  selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualToDirective, multi: true}]
})

export class EqualToDirective implements Validator {
    @Input() equalTo: string;

    constructor() {}

    // Reverse case need to be checked.
    validate(control): { [key: string]: any } {
        const compare = control.root.get(this.equalTo);
        const equalTo = compare && compare.value !== control.value;

        return equalTo ? { equalTo } : null;
    }
}
