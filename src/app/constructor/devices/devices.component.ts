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
    public deviceList = [];

    constructor(private element: ElementRef,
                private renderer: Renderer,
                private dragulaService: DragulaService) {

        this.dragulaService.setOptions('sh-constructor-devices', {
            revertOnSpill: true,
            direction: 'horizontal'
        });

        // dragulaService.drag.subscribe((value) => {
        //     console.log(value.slice(1));
        // });

        dragulaService.drop.subscribe((value) => {
            console.log(value.slice(1));
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

    drawSensor() {
        let len = this.deviceList.length;
        let last = this.deviceList[len - 1];
        this.renderer.setElementAttribute(last, 'style', `left: ${len*50}px`);
    }
    
    sensorIsUnique(sensor: Device): boolean {
        return this.sensors
            .some(s => s._id === sensor._id);
    }

    addSensor(sensor: Device): void {
        if(!this.sensorIsUnique(sensor)) {
            this.sensors.push(sensor);
        }
        let refs = this.devices
            .map(ref => ref.nativeElement)


        console.log(refs);

        // if(!this.sensorIsUnique(sensor)) {
        //     this.sensors.push(sensor);
        //     sensor.posX = (this.sensors.length - 1) * (sensorSize + 20);
        //     sensor.posY = 0;
        //     let sensorPoint = document.createElement('div');
        //     sensorPoint.setAttribute('dragula', 'drag');
        //     this.renderer.setElementAttribute(sensorPoint, 'style',
        //         `
        //          top: ${sensor.posY};
        //          left: ${sensor.posX}px;
        //      `
        //     );
        //     this.renderer.setElementAttribute(sensorPoint, 'id', sensor._id);
        //     this.renderer.setText(sensorPoint, sensor.mqttId);
        //     this.element.nativeElement.appendChild(sensorPoint);
        // }
    }
}
