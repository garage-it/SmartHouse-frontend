import { HomeComponent } from './home.component';

describe('Home', () => {
    let sut;

    beforeEach(() => {
       sut = new HomeComponent();
    });

    it('should do nothing on create view click', () => {
        sut.onCreateViewClick();
    });

});
