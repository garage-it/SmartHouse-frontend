import { Response, ResponseOptions } from '@angular/http';
import { ShHttpUtilsService } from './sh-http-utils.service';

describe('ShRequestOptions', () => {
    let sut;
    let failCb;

    beforeEach(() => {
        failCb = jasmine.createSpy('failCb');
        sut = new ShHttpUtilsService();
    });

    describe('extract error message', () => {
        let error;
        let errorMessage;

        beforeEach(() => {
            errorMessage = Symbol('some error message');
            const responseErrorOptions = new ResponseOptions({
                body: {
                    message: errorMessage
                }
            });
            error = new Response(responseErrorOptions);
        });

        it('should throw string error message', () => {
            sut.extractErrorMessage({}).subscribe(null, failCb);

            expect(failCb).toHaveBeenCalledWith(jasmine.any(String));
        });

        it('should get message from error server response', () => {
            sut.extractErrorMessage(error).subscribe(null, failCb);

            expect(failCb).toHaveBeenCalledWith(errorMessage);
        });

        it('should throw default message if no such in server response', () => {
            sut.extractErrorMessage({}).subscribe(null, failCb);

            expect(failCb).toHaveBeenCalledWith('Unknown error');
        });
    });
});
