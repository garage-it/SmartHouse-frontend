import ShRequestOptions from './sh-request-options';
import {BaseRequestOptions} from 'angular2/http';

describe('ShRequestOptions', () => {
    let sut;

    beforeEach(() => {
        spyOn(BaseRequestOptions.prototype, 'merge').and.callThrough();
        sut = new ShRequestOptions();
    });

    it('should merge by preper options', () => {
        const passedOptionsMock = { url: 'mock' };
        sut.options = { mock: 'mock'};
        sut.merge(passedOptionsMock);
        expect(BaseRequestOptions.prototype.merge).toHaveBeenCalledWith({
            url: `${ENV_PUBLIC_CONFIG.backEndUrl}/api${passedOptionsMock.url}`,
            mock: 'mock',
        });
    });
});
