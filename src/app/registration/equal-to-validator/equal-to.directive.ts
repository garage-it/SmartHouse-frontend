import { Directive, Input, OnChanges } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, FormControl } from '@angular/forms';
import { IEqualToResult } from './equal-to.interfaces';

@Directive({
    selector: '[shEqualTo]',
    providers: [{provide: NG_VALIDATORS, useExisting: EqualToDirective, multi: true}]
})

export class EqualToDirective implements Validator, OnChanges {
    // tslint:disable-next-line:no-input-rename
    @Input('shEqualTo') equalTo: string;
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

        return isInvalid ? this.invalidResult : null;
    }

    validate(c: FormControl) {
        this.control = c;
        return this.validator(c);
    }
}
