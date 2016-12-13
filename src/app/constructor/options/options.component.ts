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
    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() set isActive(value: boolean) {
        this.currentActive = value;
        this.isActiveChange.emit(value);
    };
    @Input() canBeActive: boolean = true;

    @Input() isDefault: boolean = false;
    @Input() canBeDefault: boolean = true;
}
