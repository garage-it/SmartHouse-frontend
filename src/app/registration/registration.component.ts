import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { IUserRegistrationData } from '../core/auth/auth.interfaces';
import { AuthService } from '../core/auth/auth.service';

@Component({
    templateUrl: './registration.template.html',
    styleUrls: ['./registration.style.scss'],
    selector: 'sh-registration'
})
export class RegistrationComponent {
    private registrationSubscription: Subscription;
    private error: string = '';
    private user: IUserRegistrationData = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    };

    constructor(private authService: AuthService, private router: Router) { }

    goToHomePage() {
        this.router.navigate(['/']);
    }

    save() {
        this.registrationSubscription = this.authService.register(this.user)
            .subscribe(() => {
                this.goToHomePage();
            }, err => {
                this.error = err.json().error || 'Unable to register';
            });
    }

    ngOnDestroy() {
        if (this.registrationSubscription) {
            this.registrationSubscription.unsubscribe();
        }
    }
}
