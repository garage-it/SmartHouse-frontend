import { ShRequestOptions } from './sh-request-options';

describe('ShRequestOptions', () => {
    let sut;

    beforeEach(() => {
        Object.assign(global, {
            ENV_PUBLIC_CONFIG: {
                backEndUrl: 'backEndUrl'
            }
        });

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

        it('should not prefix url again when it already contains prefix', () => {
            const url = `${ENV_PUBLIC_CONFIG.backEndUrl}/api/url`;
            result = sut.merge({ url });
            expect(result.url).toEqual(url);
        });

        it('should not prefix empty url', () => {
            result = sut.merge({url: null});
            expect(result.url).toEqual(null);
        });
    });

});
