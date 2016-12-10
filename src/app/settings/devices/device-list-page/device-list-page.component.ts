import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-device-list-page',
    templateUrl: './device-list-page.template.html',
    styleUrls: ['./device-list-page.style.scss']
})
export class DeviceListPageComponent implements OnInit {
    private deviceList = [];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.deviceList = data['deviceList'];
        });
    }
}
