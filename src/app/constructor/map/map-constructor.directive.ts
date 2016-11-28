import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import {Device} from '../../devices/device.model';
import {DragulaService} from "ng2-dragula/components/dragula.provider";

const sensorSize = 50;

@Directive({ selector: '[shMapConstructor]'})
export class MapConstructorDirective {
    private sensors: Device[] = [];

    constructor(private element: ElementRef,
                private renderer: Renderer,
                private dragulaService: DragulaService) {

        dragulaService.drag.subscribe((value) => {
            console.log(value);
        });
    }

    sensorIsUnique(sensor: Device): boolean {
        return this.sensors
            .some(s => s._id === sensor._id);
    }

    addSensor(sensor: Device): void {
        if(!this.sensorIsUnique(sensor)) {
            this.sensors.push(sensor);
            sensor.posX = (this.sensors.length - 1) * (sensorSize + 20);
            sensor.posY = 0;
            let sensorPoint = document.createElement('div');
            sensorPoint.setAttribute('dragula', 'drag');
            this.renderer.setElementAttribute(sensorPoint, 'style',
                `width: ${sensorSize}px; 
                 height: ${sensorSize}px; 
                 border-radius: 50%;
                 border: 2px solid #fff;
                 background: #30d16a;
                 color: #fff;
                 position: absolute;
                 top: ${sensor.posY};
                 left: ${sensor.posX}px;
             `
            );
            this.renderer.setElementAttribute(sensorPoint, 'id', sensor._id);
            this.renderer.setText(sensorPoint, sensor.mqttId);
            this.element.nativeElement.appendChild(sensorPoint);
        }

    }
}

