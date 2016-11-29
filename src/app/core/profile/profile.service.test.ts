import { Observable } from 'rxjs/Rx';
import { fakeAsync, tick } from '@angular/core/testing';
import { ProfileService } from './profile.service';

describe('Profile Service', () => {
    let sut;
    let http;
    let storage;
    let successCb;

    beforeEach(() => {
        successCb = jasmine.createSpy('successCb');
        http = jasmine.createSpyObj('http', ['get', 'setAuthHeader', 'removeAuthHeader']);
        storage = jasmine.createSpyObj('storage', ['setToken', 'getToken', 'removeToken']);

        sut = new ProfileService(http, storage);
    });

    describe('profile retrieve', () => {

        describe('when NO token stored', () => {
            beforeEach(() => {
                storage.getToken.and.returnValue(null);
                sut.retrieve();
            });

            it('should not fetch user', () => {
                expect(http.get).not.toHaveBeenCalled();
            });

            it('should respond with success', fakeAsync(() => {
                sut.retrieve().then(successCb);
                tick();

                expect(successCb).toHaveBeenCalled();
            }));
        });

        describe('when token present', () => {
            const token = Symbol('token');

            beforeEach(() => {
                storage.getToken.and.returnValue(token);
            });

            describe('when user already stored', () => {

                beforeEach(() => {
                    sut.user = Symbol('user profile data');
                    sut.retrieve();
                });

                it('should not fetch user', () => {
                    expect(http.get).not.toHaveBeenCalled();
                });

                it('should respond with success', fakeAsync(() => {
                    sut.retrieve().then(successCb);
                    tick();

                    expect(successCb).toHaveBeenCalled();
                }));
            });

            describe('when user NOT stored', () => {
                let userData = Symbol('profile data');

                beforeEach(() => {
                    spyOn(sut, 'setUserData');
                    http.get.and.returnValue(Observable.of({ responses: userData }));
                    sut.retrieve();
                });

                it('should set auth header to request', () => {
                    expect(http.setAuthHeader).toHaveBeenCalledWith(token);
                });

                it('should fetch user', () => {
                    expect(http.get).toHaveBeenCalledWith('/user/current-user');
                });

                it('should save retrieved user data', fakeAsync(() => {
                    sut.retrieve();
                    tick();

                    expect(sut.setUserData).toHaveBeenCalledWith(userData);
                }));
            });
        });
    });

    describe('set user data', () => {
        const user = Symbol('user profile data');
        const token = Symbol('user token');

        beforeEach(() => {
            sut.setUserData(user);
        });

        it('should save user', () => {
            expect(sut.user).toEqual(user);
        });

        describe('if token passed', () => {
            beforeEach(() => {
                sut.setUserData(user, token);
            });

            it('should save token', () => {
                expect(storage.setToken).toHaveBeenCalledWith(token);
            });

            it('should set auth headers', () => {
                expect(http.setAuthHeader).toHaveBeenCalledWith(token);
            });
        });
    });

    describe('remove user data', () => {
        beforeEach(() => {
            sut.removeUserData();
        });

        it('should clean user', () => {
            expect(sut.user).toEqual(null);
        });


        it('should remove saved token', () => {
            expect(storage.removeToken).toHaveBeenCalled();
        });

        it('should remove auth header', () => {
            expect(http.removeAuthHeader).toHaveBeenCalled();
        });
    });

    describe('is user logged in', () => {
        it('should check if user logged in', () => {
            sut.user = {
                role: Symbol('some user role')
            };

            expect(sut.isLoggedIn()).toEqual(true);
        });

        it('should check if user NOT logged in', () => {
            sut.user = null;

            expect(sut.isLoggedIn()).toEqual(false);
        });
    });

    describe('is user guest', () => {
        it('should check if user is guest', () => {
            sut.user = null;

            expect(sut.isGuest()).toEqual(true);
        });

        it('should check if user NOT a guest', () => {
            sut.user = {
                role: Symbol('some user role')
            };

            expect(sut.isGuest()).toEqual(false);
        });
    });

    describe('authorized user', () => {
        it('should have role', () => {
            const expectedRole = 'admin';

            sut.user = {
                role: 'admin'
            };

            expect(sut.getUserRole()).toEqual(expectedRole);
        });
    });

    describe('authorized user', () => {
        beforeEach(() => {
            spyOn(sut, 'getUserRole').and.returnValue('admin');
        });

        it('should have one of role', () => {
            expect(sut.isUserRoleIn(['admin', 'user'])).toEqual(true);
        });

        it('role is not suitable', () => {
            expect(sut.isUserRoleIn(['user'])).toEqual(false);
        });

        it('with undefined role', () => {
            expect(sut.isUserRoleIn()).toEqual(true);
        });

        it('with empty role', () => {
            expect(sut.isUserRoleIn([])).toEqual(true);
        });
    });
});
