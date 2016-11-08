import { MainComponent } from './main.component';

describe('Main', () => {
    let sut;

    beforeEach(() => {
        sut = new MainComponent();
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });
});
