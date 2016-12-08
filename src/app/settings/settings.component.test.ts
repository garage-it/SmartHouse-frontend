import { SettingsComponent } from './settings.component';
import { NAVIGATION_ROUTES } from './settings-navigation-routes';

describe('Settings Component', () => {
    let sut;

    beforeEach(() => {
        sut = new SettingsComponent();
    });

    it('should show navigation routes', () => {
        expect(sut.navigationRoutes).toEqual(NAVIGATION_ROUTES);
    });
});
