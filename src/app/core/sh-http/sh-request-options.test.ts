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
        const options = { url: 'url' };
        let result;

        beforeEach(() => {
            result = sut.merge(options);
        });

        it('should prefix url', () => {
            expect(result.url).toEqual(`${ENV_PUBLIC_CONFIG.backEndUrl}/api${options.url}`);
        });
    });

});
