import { Component, ElementRef, Renderer, Input } from '@angular/core';
import { Device } from '../../shared/devices/device.model';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'sh-constructor-devices',
    templateUrl: './devices.template.html',
    styleUrls: ['./devices.style.scss']
})
export class DevicesComponent {
    @Input() edittedDevices: Device[];

    public switcher: boolean = false;

    constructor(private element: ElementRef,
                private renderer: Renderer,
                private dragulaService: DragulaService) {
    }

    ngOnInit() {
        this.dragAndDrop();
    }

    saveCoordinates(target, x: number, y: number): void {
        this.edittedDevices.forEach(device => {
            if (device._id === target) {
                device.posX = x;
                device.posY = y;
            }
        });
    }

    dragAndDrop(): void {
        this.dragulaService.drag.subscribe((value) => {
            let X, Y, curX, curY;
            const target = value.slice(1)[0];
            const targetId = target.getAttribute('id');
            const parent = this.element.nativeElement;
            const parentWidth = Number.parseInt(getComputedStyle(parent).width);
            const parentHeight = Number.parseInt(getComputedStyle(parent).height);

            document.onmouseup = () => {
                const left = X - curX + Number.parseInt(getComputedStyle(target).left);
                const top =  Y - curY + Number.parseInt(getComputedStyle(target).top);
                if (left > 0 && left < parentWidth
                    && top > 0 && top < parentHeight) {
                    this.renderer.setElementAttribute(target, 'style', `left: ${left}px; top: ${top}px;`);
                    this.saveCoordinates(targetId, left, top);
                }
                document.onmouseup = null;
                document.onmousemove = null;
            };

            document.onmousemove = (e: MouseEvent) => {
                curX = curX ? curX : e.clientX;
                curY = curY ? curY : e.clientY;
                X = e.clientX;
                Y = e.clientY;
            };
        });
    }
}
