import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LogoutComponent } from './logout.component';

import { CoreModule } from '../core/core.module';
import { AuthService } from '../core/auth/auth.service';

describe('Logout', function () {
    function createComponent(): ComponentFixture<LogoutComponent> {
        return TestBed.createComponent(LogoutComponent);
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule,
                CoreModule
            ],
            declarations: [ LogoutComponent ],
            providers: [
                AuthService
            ]
        });
    });

    describe('Logic', () => {
        describe('#ngOnInit', () => {
            it('should logout and redirect to home',
                inject([AuthService, Router], (auth: AuthService, router: Router) => {
                    // Data
                    const homeUrl = '/';

                    // Spies
                    spyOn(auth, 'logout');
                    spyOn(router, 'navigate');

                    // Prepare
                    const fixture = createComponent();

                    // Run
                    fixture.detectChanges();

                    // Expect
                    expect(auth.logout).toHaveBeenCalled();
                    expect(router.navigate).toHaveBeenCalledWith([homeUrl]);
                })
            );
        });
    });
});
