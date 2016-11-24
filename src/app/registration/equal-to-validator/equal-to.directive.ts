import { Directive, Input, OnChanges } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, FormControl } from '@angular/forms';
import { IEqualToResult } from './equal-to.interfaces';

@Directive({
    // tslint:disable-next-line:directive-selector-name directive-selector-prefix
    selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
    providers: [{provide: NG_VALIDATORS, useExisting: EqualToDirective, multi: true}]
})

export class EqualToDirective implements Validator, OnChanges {
    @Input() equalTo: string;
    control: FormControl;
    invalidResult: IEqualToResult = {
        equalTo: {
            valid: false
        }
    };

    constructor() {}

    ngOnChanges(changes) {
        if (changes.equalTo && this.control) {
            const errors = this.validate(this.control);

            this.control.setErrors(errors);
        }
    }

    validator(c: AbstractControl) {
        const isInvalid = c && c.value !== this.equalTo;
        const errors = isInvalid ? this.invalidResult : null;

        return errors;
    }

    validate(c: FormControl) {
        this.control = c;
        return this.validator(c);
    }
}
