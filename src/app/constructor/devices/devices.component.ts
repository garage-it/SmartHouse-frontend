import {OnInit, Component, ViewChildren, AfterViewInit, ElementRef, Renderer} from '@angular/core';
import {Device} from '../../devices/device.model';
import {DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'sh-constructor-devices',
    templateUrl: './devices.template.html',
    styleUrls: [ './devices.style.scss' ]
})
export class DevicesComponent implements AfterViewInit{
    @ViewChildren('devices') private devices;
    public sensors: Device[] = [];
    public deviceList: ElementRef[] = [];
    
    constructor(private element: ElementRef,
                private renderer: Renderer,
                private dragulaService: DragulaService) {
    }

    ngAfterViewInit() {
        this.devices
            .changes
            .subscribe(()=>{
                this.deviceList = this.devices
                    .map(ref => ref.nativeElement);
                this.drawSensor();
            });

        this.dragAndDrop();
    }

    drawSensor(): void {
        let len = this.deviceList.length;
        let last = this.deviceList[len - 1];
        let sensor = this.sensors[this.sensors.length-1];
        let posX = len * 50;
        let posY = 0;

        if(!sensor.posX) {
            sensor.posX = posX;
        }
        if (!sensor.posY) {
            sensor.posY = posY;
        }

        this.renderer.setElementAttribute(last, 'style', `left: ${sensor.posX}px; top: ${sensor.posY}px;`);

        this.renderer.setElementAttribute(last, 'id', sensor._id);

    }
    
    sensorIsUnique(sensor: Device): boolean {
        return this.sensors
            .some(s => s._id === sensor._id);
    }

    addSensor(sensor: Device): void {
        if(!this.sensorIsUnique(sensor)) {
            this.sensors.push(sensor);
        }
    }

    saveCoordinates(target, x: number, y: number): void {
        this.sensors.filter(s => s._id == target.id)
            .forEach((s) => {
                s.posX = x;
                s.posY = y;
            });
    }

    dragAndDrop(): void {
        this.dragulaService.drag.subscribe((value) => {
            let X, Y;
            let target = value.slice(1)[0];
            let targetWidth = parseInt(getComputedStyle(target).width);
            let targetHeight = parseInt(getComputedStyle(target).height);
            let parent = this.element.nativeElement;
            let parentSize = parent.getBoundingClientRect();
            let parentWidth = parseInt(getComputedStyle(parent).width);
            let parentHeight = parseInt(getComputedStyle(parent).height);

            document.onmouseup = () => {
                let left = X - parseInt(parentSize.left) -  targetWidth/2;
                let top = Y - parseInt(parentSize.top) - targetHeight/2;
                if (left > 0 && left < parentWidth
                    && top > 0 && top < parentHeight) {
                    this.renderer.setElementAttribute(target, 'style', `left: ${left}px; top: ${top}px;`);
                    this.saveCoordinates(target, left, top);
                }
                document.onmouseup =  null;
                document.onmousemove =  null;
            };

            document.onmousemove = (e)=> {
                X = e.clientX;
                Y = e.clientY;
            }
        });
    }
}
