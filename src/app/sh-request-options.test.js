import ShRequestOptions from './sh-request-options';
import {BaseRequestOptions} from 'angular2/http';

describe('ShRequestOptions', () => {
    let sut;

    beforeEach(() => {
        spyOn(BaseRequestOptions.prototype, 'merge').and.callThrough();
        sut = new ShRequestOptions();
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should get sensor data from the server', () => {
        const passedOptionsMock = { url: 'mock' };
        sut.options = { mock: 'mock'};
        sut.merge(passedOptionsMock);
        expect(BaseRequestOptions.prototype.merge).toHaveBeenCalled();
    });
});
