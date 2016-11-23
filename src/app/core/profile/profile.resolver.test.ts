import { ProfileResolver } from './profile.resolver';

describe('ProfileResolver', () => {
    let sut;
    let profile;
    const retrievedData = Symbol('retrieved profile data');

    beforeEach(() => {
        profile = jasmine.createSpyObj('profile', ['retrieve']);

        sut = new ProfileResolver(profile);
    });

    it('should retrieve profile', () => {
        profile.retrieve.and.returnValue(retrievedData);

        expect(sut.resolve()).toEqual(retrievedData);
    });
});
