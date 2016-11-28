import { WindowRef } from './window-ref.service';

describe('WindowRef', function () {
    let service;

    beforeEach(() => {
        service = new WindowRef();
    });

    describe('#nativeWindow', () => {
        it('should return window instance', () => {
            // Run
            const result = service.nativeWindow;

            // Expect
            expect(result).toBe(window);
        });
    });
});
