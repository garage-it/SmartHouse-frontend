import { ConstructorService } from './constructor.service';

describe('ConstructorService', () => {
    const response = {};

    let sut;
    let http;
    let result;

    beforeEach(() => {

        http = {
            post: jasmine.createSpy('post').and.returnValue(response)
        };

        sut = new ConstructorService(http);
    });

    describe('create', () => {

        const viewInfoDto = {};

        beforeEach(() => {
            result = sut.createOrUpdate(viewInfoDto);
        });

        it('should make request to create view', () => {
            expect(http.post).toHaveBeenCalledWith('/views', viewInfoDto);
        });

        it('should return response', () => {
            expect(result).toEqual(response);
        });

    });
});
