import { MapConstructorComponent } from './map-constructor.component';

describe('MapConstructor', () => {
    let sut;
    let Router;
    let NgZone;
    let Renderer;
    let MapViewService;

    beforeEach(() => {
        Router = {};
        NgZone = {};
        Renderer = {};
        MapViewService = {};
        sut = new MapConstructorComponent(Router, NgZone, Renderer, MapViewService);
    });

    describe('on add sensor', () => {

        const sensor = {
            _id: '123'
        };
        let addedSensors;

        beforeEach(() => {
            addedSensors = [{_id: '123'}, {_id: '234'}, {_id: '345'}];
            sut.edittedDevices = addedSensors;
        });

        describe('when there is no map image', () => {
            it('should not add device-widgets to map view', () => {
                sut.onAddSensor(sensor);
                expect(sut.edittedDevices).toEqual(addedSensors);
            });
        });

        describe('when map image is defined', () => {

            beforeEach(() => {
                sut.picture = {};
            });

            describe('when sensor is already added to map view', () => {
                beforeEach(() => {
                    sut.onAddSensor(sensor);
                });

                it('should not add sensor to map view again', () => {
                    expect(sut.edittedDevices).toEqual(addedSensors);
                });
            });

            describe('when sensor was not added to map view yet', () => {
                beforeEach(() => {
                    sensor._id = '765';
                    sut.updateEdittedSensors = jasmine.createSpy('updateEdittedSensors');
                    sut.onAddSensor(sensor);
                });

                it('should set initial coordinates to sensor', () => {
                    addedSensors.concat({_id: '765', posX: 300, posY: 0});
                    expect(sut.edittedDevices).toEqual(addedSensors);
                });
            });
        });
    });

    describe('on remove sensor', () => {

        const sensor = {_id: '123'};

        beforeEach(() => {
            sut.picture = {};
            sut.edittedDevices = [{_id: '123'}, {_id: '234'}, {_id: '345'}];
            sut.updateEdittedSensors = jasmine.createSpy('updateEdittedSensors');
            sut.onRemoveSensor(sensor);
        });

        it('should remove sensor from list of added device-widgets to map view', () => {
            expect(sut.edittedDevices).toEqual([{_id: '234'}, {_id: '345'}]);
        });
    });
});
