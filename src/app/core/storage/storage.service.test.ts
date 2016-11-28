import { StorageService } from './storage.service';

describe('Storage', () => {
    let sut;
    const token = Symbol('token');
    const tokenKey = 'sh-token';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.returnValue(token);
        spyOn(localStorage, 'removeItem');

        sut = new StorageService();
    });

    it('should be able to set token to local storage', () => {
        sut.setToken(token);

        expect(localStorage.setItem).toHaveBeenCalledWith(tokenKey, token);
    });

    it('should be able to get token from local storage', () => {
        sut.getToken();

        expect(sut.getToken()).toEqual(token);
    });

    it('should be able to get token from local storage', () => {
        sut.removeToken();

        expect(localStorage.removeItem).toHaveBeenCalledWith(tokenKey);
    });
});
