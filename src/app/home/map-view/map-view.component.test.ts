import { MapViewComponent } from './map-view.component';

describe('Map View', () => {
    let sut;

    beforeEach(() => {
        sut = new MapViewComponent();
    });

    describe('get image', () => {
        it('should get appropriate url where image can be loaded', () => {
            const currentMapView = {
                pictureName: 'some picture name'
            };
            sut.currentMapView = jasmine.createSpy('currentMapView').and.returnValue(currentMapView);
            expect(sut.getImage()).toEqual('http://localhost:3000/api/files/' + sut.currentMapView.pictureName);
        });
    });

});
