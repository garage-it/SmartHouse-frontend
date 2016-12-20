import { ViewService } from './view.service';

describe('ViewService', () => {
    const response = {};

    let sut;
    let http;
    let result;

    beforeEach(() => {

        http = {
            post: jasmine.createSpy('put').and.returnValue(response)
        };

        sut = new ViewService(http);
    });

    describe('create', () => {

        const viewInfoDto = {};

        beforeEach(() => {
            result = sut.create(viewInfoDto);
        });

        it('should make request to create view', () => {
            expect(http.post).toHaveBeenCalledWith('/views', viewInfoDto);
        });

        it('should return response', () => {
            expect(result).toEqual(response);
        });

    });
});
