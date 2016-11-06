// import {async, TestBed} from '@angular/core/testing';
// import { ActivatedRoute } from '@angular/router';
//
// import { DashboardSensorDetailsComponent } from './dashboard-sensor-details.component';
//
// describe('DashboardSensorDetails', () => {
//     let sut;
//     let currentRoute;
//
//     beforeEach(async(() => {
//         currentRoute = {
//             snapshot: {
//                 params: {
//                     id: 123
//                 }
//             },
//             data: {
//                 subscribe: jasmine.createSpy('subscribe')
//             }
//         };
//
//         TestBed.configureTestingModule({
//             declarations: [DashboardSensorDetailsComponent],
//             providers: [
//                 {provide: ActivatedRoute, useValue: currentRoute}
//             ]
//         })
//         .overrideComponent(DashboardSensorDetailsComponent, {
//             set: {template: 'mocked template'}
//         })
//         .compileComponents()
//         .then(() => {
//             sut = TestBed.createComponent(DashboardSensorDetailsComponent).componentInstance;
//         });
//     }));
//
//     describe('On Init', () => {
//         let subscribeHandler;
//         const deviceStatistic = {
//             items: [{}, {}]
//         };
//         const responseData = {deviceStatistic};
//
//         beforeEach(() => {
//             currentRoute.data.and.returnValue({
//                 subscribe: (callback) => {
//                     subscribeHandler = callback;
//                 }
//             });
//             sut.ngOnInit();
//         });
//
//         it('should get id of sensor', () => {
//             expect(sut.sensorId).toEqual(currentRoute.snapshot.params.id);
//         });
//
//         /*it('should store received widgets', () => {
//             subscribeHandler(responseData);
//             expect(sut.deviceStatistic).toEqual(deviceStatistic);
//         });
//
//         it('should set initial data', () => {
//             subscribeHandler(responseData);
//             expect(sut.defaultResolver).toEqual(deviceStatistic);
//         });*/
//     });
//
//     describe('On Destroy', () => {
//         /*it('should destroy current routd data listener when component is destroyed', () => {
//             sut.ngOnDestroy();
//         });*/
//     });
// });
