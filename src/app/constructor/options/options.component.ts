import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'sh-options',
    templateUrl: './options.template.html',
    styleUrls: [ './options.style.scss' ]
})
export class OptionsComponent {
    @Input() id: string;

    private currentActive: boolean;
    private defaultSubviewValue: string;

    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() set isActive(value: boolean) {
        this.currentActive = value;
        this.isActiveChange.emit(value);
    };
    @Input() canBeActive: boolean = true;



    @Output() defaultSubviewChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    set defaultSubview(value) {
        this.defaultSubviewValue = value;
        this.defaultSubviewChange.emit(value);
    };
    get defaultSubview(): string {
        return this.defaultSubviewValue;
    };
}
