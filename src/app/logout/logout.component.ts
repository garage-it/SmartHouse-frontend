import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'sm-logout',
    template: ''
})
export class LogoutComponent implements OnInit {
    constructor(private auth: AuthService, private router: Router) {}

    ngOnInit() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
}
