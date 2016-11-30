import { RolesService } from './roles.service';

describe('Roles Service', () => {
    let sut;
    let ShHttpService;

    beforeEach(() => {
        ShHttpService = {
            get: jasmine.createSpy('get')
        };

        sut = new RolesService(ShHttpService);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should retrieve list of users from the server', () => {
        sut.retrieve();

        expect(ShHttpService.get).toHaveBeenCalledWith('/user');
    });
});
