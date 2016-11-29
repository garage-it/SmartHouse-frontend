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

        let posX;
        let pos = this.element.nativeElement.getBoundingClientRect();

        dragulaService.drag.subscribe((value) => {
            let X;
            console.log(value);

            posX = value.slice(1)[0].style.left;
            document.onmouseup = function() {
                console.log(X - parseInt(pos.left) + 'px');
                value.slice(1)[0].style.left = X - parseInt(pos.left) + 'px';
                document.onmouseup =  null;
            };

            document.onmousemove = function(e) {
                console.log('ss')
                X = e.pageX;
            }
        });
        dragulaService.drop.subscribe((value) => {
            console.log('drop');
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
