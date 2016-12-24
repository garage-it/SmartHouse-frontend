import { DeviceComponent } from './device.component';

describe('Device Component', () => {
    let sut;

    beforeEach(() => {
        sut = new DeviceComponent();
    });

    describe('switch device', () => {
        beforeEach(() => {
            sut.device = {
                executor: false
            };
            sut.switchSensor();
        });

        it('should turn on switcher when it is turned off', () => {
            expect(sut.device.executor).toBeTruthy();
        });

        it('should turn off switcher when it is turned on', () => {
            sut.switchSensor();
            expect(sut.device.executor).toBeFalsy();
        });
    });

    describe('switcher icon', () => {
        beforeEach(() => {
            sut.device = {
                executor: true
            };
        });

        it('should get switcher on icon url when it is turned on', () => {
            expect(sut.switcherImageUrl()).toEqual('url(assets/switcherON.svg)');
        });

        it('should get switcher off icon url when it is turned off', () => {
            sut.switchSensor();
            expect(sut.switcherImageUrl()).toEqual('url(assets/switcherOFF.svg)');
        });
    });

});
