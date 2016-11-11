import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

import { CoreModule } from '../core/core.module';
import { AuthService } from '../core/auth/auth.service';

describe('Login', function () {
    function createComponent(): ComponentFixture<LoginComponent> {
        return TestBed.createComponent(LoginComponent);
    }

    function createComponentAndDetectChanges(): ComponentFixture<LoginComponent> {
        const fixture = createComponent();
        fixture.detectChanges();

        return fixture;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule,
                CoreModule
            ],
            declarations: [ LoginComponent ],
            providers: [
                AuthService
            ]
        });
    });

    describe('Template', () => {
        describe('#constructor', () => {
            it('should hide validation messages or wrappers', () => {
                // Data
                const expectCountOfNotHiddenValidationMessages = 0;

                // Run
                const fixture = createComponentAndDetectChanges();
                const validationMessageAndWrapperPredicate = By.css(
                    '.validation-message-wrapper,:not(.validation-message-wrapper) > .validation-message'
                );
                const countOfNotHiddenValidationMessagesAndWrappers =
                    fixture.debugElement.queryAll(validationMessageAndWrapperPredicate)
                        .map((de) => de.nativeElement)
                        .filter((el) => !el.hasAttribute('hidden'))
                        .length;

                // Expect
                expect(countOfNotHiddenValidationMessagesAndWrappers).toBe(expectCountOfNotHiddenValidationMessages);
            });

            it('should not disable submit button', () => {
                // Run
                const fixture = createComponentAndDetectChanges();
                const submitEl = fixture.debugElement.query(By.css('[type="submit"]')).nativeElement;
                const isSubmitDisabled = submitEl.hasAttribute('disabled');

                // Expect
                expect(isSubmitDisabled).toBeFalsy();
            });

            it('should exists registration link', () => {
                // Run
                const fixture = createComponentAndDetectChanges();
                const registrationLinkDebugEl = fixture.debugElement.query(
                    By.css('[ng-reflect-router-link="/registration"]')
                );

                // Expect
                expect(registrationLinkDebugEl).not.toBeNull();
            });
        });
    });

    describe('Logic', () => {
        describe('#login', () => {
            it('should login and redirect to home for valid credentials',
                inject([AuthService, Router], (auth: AuthService, router: Router) => {
                    // Data
                    const homeUrl = '/';
                    const credentials = {
                        email: 'valid@valid.com',
                        password: 'valid-pass'
                    };

                    // Spies
                    const authServiceLoginObservable = {
                        subscribe(next) { next(); }
                    };
                    spyOn(auth, 'login').and.returnValue(authServiceLoginObservable);
                    spyOn(router, 'navigate');

                    // Prepare
                    const fixture = createComponentAndDetectChanges();
                    const comp = fixture.componentInstance;
                    comp.credentials = credentials;

                    // Run
                    comp.login();

                    // Expect
                    expect(auth.login).toHaveBeenCalledWith(credentials);
                    expect(router.navigate).toHaveBeenCalledWith([homeUrl]);
                })
            );

            it('should show error for invalid credentials', inject([AuthService], (auth: AuthService) => {
                // Data
                const credentials = {
                    email: 'invalid@invalid.com',
                    password: 'invalid-pass'
                };

                // Spies
                const authServiceLoginObservable = {
                    subscribe(next, error) { error(); }
                };
                spyOn(auth, 'login').and.returnValue(authServiceLoginObservable);

                // Prepare
                const fixture = createComponentAndDetectChanges();
                const comp = fixture.componentInstance;
                comp.credentials = credentials;

                // Run
                comp.login();

                // Expect
                expect(auth.login).toHaveBeenCalledWith(credentials);
                expect(comp.loggingError).toBeTruthy();
            }));
        });

        describe('#ngOnDestroy', () => {
            it('should destroy component without any login attempt', () => {
                // Prepare
                const fixture = createComponentAndDetectChanges();
                const comp = fixture.componentInstance;

                // Run
                comp.ngOnDestroy();

                // Expect
                // Exception was not thrown
            });

            it('should show error for invalid credentials', inject([AuthService], (auth: AuthService) => {
                // Spies
                const loginSubscription = jasmine.createSpyObj('loginSubscription', [ 'unsubscribe' ]);
                const authServiceLoginObservable = jasmine.createSpyObj('authServiceLoginObservable', [ 'subscribe' ]);
                authServiceLoginObservable.subscribe.and.returnValue(loginSubscription);
                spyOn(auth, 'login').and.returnValue(authServiceLoginObservable);

                // Prepare
                const fixture = createComponentAndDetectChanges();
                const comp = fixture.componentInstance;
                comp.login();

                // Run
                comp.ngOnDestroy();

                // Expect
                expect(loginSubscription.unsubscribe).toHaveBeenCalledWith();
            }));
        });
    });
});
