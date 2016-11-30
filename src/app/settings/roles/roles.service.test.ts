import { Observable } from 'rxjs/Rx';
import { RolesService } from './roles.service';

describe('Roles Service', () => {
    let sut, http;

    beforeEach(() => {
        http = jasmine.createSpyObj('http', ['get']);

        sut = new RolesService(http);

        sut.http.get.and.returnValue(Observable.of({
            responses: [1, 2]
        }));
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should retrieve list of users from the server', () => {
        sut.retrieve();

        expect(sut.http.get).toHaveBeenCalledWith('/user');
    });
});
