import { AppComponent, NAVIGATION_ROUTES } from './app.component';

describe('App', () => {
    describe('#constructor', () => {
        it('should be defined', () => {
            expect(AppComponent).toBeDefined();
        });
    });

    it('should return available routes', () => {
        const app = new AppComponent();
        expect(app.getRoutes()).toEqual(NAVIGATION_ROUTES);
    });
});
