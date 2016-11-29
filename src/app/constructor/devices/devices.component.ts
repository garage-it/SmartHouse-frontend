import {OnInit, Component, ViewChildren, AfterViewInit, ElementRef, Renderer} from '@angular/core';
import {Device} from 'src/app/devices/device.model';
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

        dragulaService.drag.subscribe((value) => {
            console.log(value);
        });
        dragulaService.drop.subscribe((value) => {
            console.log(value);
        });
    }

    ngAfterViewInit() {
        this.devices
            .changes
            .subscribe(()=>{
                this.deviceList = this.devices
                    .map(ref => ref.nativeElement);
                this.drawSensor();
            })
    }

    drawSensor(): void {
        let len = this.deviceList.length;
        let last = this.deviceList[len - 1];
        let posX = len * 50;
        //TODO: change 50 to actual size of the element

        let posY = 0;
        this.renderer.setElementAttribute(last, 'style', `left: ${posX}px; top: ${posY}px;`);

        let sensor = this.sensors[this.sensors.length-1];
        sensor.posX = posX;
        sensor.posY = posY;
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
}
