import { LogoutComponent } from './logout.component';

describe('Logout component', () => {
    let sut;
    let router;
    let AuthService;

    beforeEach(() => {
        AuthService = {
            logout: jasmine.createSpy('login')
        };
        router = {
            navigate: jasmine.createSpy('navigate')
        };
        sut = new LogoutComponent(AuthService, router);
    });

    describe('on component init', () => {
        let homePage;

        beforeEach(() => {
            homePage = '/';
            sut.ngOnInit();
        });

        it('should logout user', () => {
            expect(AuthService.logout).toHaveBeenCalled();
        });

        it('should navigate to home page', () => {
            expect(router.navigate).toHaveBeenCalledWith([homePage]);
        });
    });
});
