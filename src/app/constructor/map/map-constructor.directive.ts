import {Directive, ElementRef, Input, Renderer, ViewChildren, ContentChild, ContentChildren} from '@angular/core';
import {Device} from '../../devices/device.model';
import {DragulaService} from "ng2-dragula/components/dragula.provider";

const sensorSize = 50;

@Directive({ selector: '[shMapConstructor]'})
export class MapConstructorDirective {
    private sensors: Device[] = [];

    @ViewChildren('dynamicElement') private dynamicElementRefs;

    // constructor(private element: ElementRef,
    //             private renderer: Renderer,
    //             private dragulaService: DragulaService) {
    //
    //     dragulaService.drag.subscribe((value) => {
    //         console.log(value);
    //     });
    // }



}

