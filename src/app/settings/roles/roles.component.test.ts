import { RolesComponent } from './roles.component';
import { Observable } from 'rxjs/Rx';

describe('Roles Component', () => {
    const mockedUsers = [1, 2];

    let sut, rolesService;

    beforeEach(() => {
        rolesService = {
            retrieve: jasmine.createSpy('retrieve')
        };

        sut = new RolesComponent(
            rolesService
        );
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.rolesService.retrieve.and.returnValue(Observable.of({
                responses: mockedUsers
            }));

            sut.ngOnInit();
        });

        it('should call loginByAccessToken', () => {
            expect(sut.rolesService.retrieve).toHaveBeenCalled();
        });

        it('should return a list of users', () => {
            expect(sut.users).toEqual(mockedUsers);
        });
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            sut.subscription = {
                unsubscribe: jasmine.createSpy('roleService unsubscribe')
            };

            sut.ngOnDestroy();
        });

        it('should unsubscribe from roleService events', () => {
            expect(sut.subscription.unsubscribe).toHaveBeenCalled();
        });
    });
});
