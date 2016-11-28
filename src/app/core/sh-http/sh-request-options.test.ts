import { ShRequestOptions } from './sh-request-options';

describe('ShRequestOptions', () => {
    let sut;

    beforeEach(() => {
        sut = new ShRequestOptions();
    });

    it('should use application/json as default content type', () => {
        expect(sut.headers.get('Content-Type')).toEqual('application/json');
    });

    describe('merge', () => {
        let result;

        it('should prefix url', () => {
            result = sut.merge({ url: '/url' });
            expect(result.url).toEqual(`${ENV_PUBLIC_CONFIG.backEndUrl}/api/url`);
        });

        it('should not prefix empty url', () => {
            result = sut.merge({url: null});
            expect(result.url).toEqual(null);
        });
    });

});
