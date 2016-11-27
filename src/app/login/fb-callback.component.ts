import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowRef } from '../core/browser/window-ref.service';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'sh-fb-callback',
    templateUrl: './fb-callback.component.html'
})

export class FbCallbackComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    constructor(
        private windowRef: WindowRef,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        const accessToken = this.parseAccessToken();

        if (accessToken) {
            this.subscription = this.authService.loginByAccessToken(accessToken)
                .subscribe(() => {
                    this.router.navigate(['/']);
                }, () => {
                    this.router.navigate(['login/error/fb']);
                });
        } else {
            this.router.navigate(['login/error/fb']);
        }
    }

    parseAccessToken() {
        const locationHash = this.windowRef.nativeWindow.location.hash.substring(1);
        const match = locationHash.match(new RegExp('access_token=([^&]+)', 'i'));

        if (!match) {
            return null;
        }

        return match[1];
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
