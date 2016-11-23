import { fakeAsync, tick } from '@angular/core/testing';

import { LoggedInGuard, GuestGuard } from './profile.guards';

describe('Profile guards', () => {
    let sut;
    let profile;
    let router;
    let successCb;

    beforeEach(() => {
        successCb = jasmine.createSpy('successCb');
        profile = jasmine.createSpyObj('profile', ['retrieve', 'isGuest', 'isLoggedIn']);
        router = jasmine.createSpyObj('router', ['navigate']);
    });

    describe('logged in guard', () => {
        beforeEach(() => {
            sut = new LoggedInGuard(router, profile);
            profile.retrieve.and.returnValue(Promise.resolve());
            sut.canActivate();
        });

        it('should retrieve profile', () => {
            expect(profile.retrieve).toHaveBeenCalled();
        });

        it('should pass if user logged in', fakeAsync (() => {
            profile.isLoggedIn.and.returnValue(true);
            sut.canActivate().then(successCb);
            tick();

            expect(successCb).toHaveBeenCalledWith(true);
        }));

        it('should navigate to login page if user is not logged in', fakeAsync (() => {
            profile.isLoggedIn.and.returnValue(false);
            sut.canActivate();
            tick();

            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        }));
    });

    describe('guest guard', () => {
        beforeEach(() => {
            sut = new GuestGuard(router, profile);
            profile.retrieve.and.returnValue(Promise.resolve());
            sut.canActivate();
        });

        it('should retrieve profile', () => {
            expect(profile.retrieve).toHaveBeenCalled();
        });

        it('should pass if user is guest', fakeAsync (() => {
            profile.isGuest.and.returnValue(true);
            sut.canActivate().then(successCb);
            tick();

            expect(successCb).toHaveBeenCalledWith(true);
        }));

        it('should navigate to home page if user is not a guest', fakeAsync (() => {
            profile.isGuest.and.returnValue(false);
            sut.canActivate();
            tick();

            expect(router.navigate).toHaveBeenCalledWith(['/']);
        }));
    });
});
