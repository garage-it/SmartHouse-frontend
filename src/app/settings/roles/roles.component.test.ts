import { RolesComponent } from './roles.component';

describe('Roles Component', () => {
    const mockedUsers = [1, 2];

    let sut, rolesService, retrievePromise;

    beforeEach(() => {
        retrievePromise = Promise.resolve(mockedUsers);
        rolesService = jasmine.createSpyObj('rolesService', ['retrieve']);
        rolesService.retrieve.and.returnValue(retrievePromise);

        sut = new RolesComponent(
            rolesService
        );
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should call retrieve', () => {
            expect(rolesService.retrieve).toHaveBeenCalled();
        });

        it('should return a list of users', (done) => {
            retrievePromise.then(() => {
                expect(sut.users).toEqual(mockedUsers);
                done();
            }).catch(done);
        });
    });
});
