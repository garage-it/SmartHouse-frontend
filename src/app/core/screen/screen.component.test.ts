import { ScreenComponent } from './screen.component';

describe('Screen', () => {
    let sut;

    beforeEach(() => {
        sut = new ScreenComponent();
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });
});
