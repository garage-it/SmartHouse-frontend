import {CalendarComponent} from './calendar.component';
describe('CalendarComponent', () => {
    let sut;
    beforeEach(() => {
       sut = new CalendarComponent();
    });

   describe('#valueChanged', () => {
       it('should emit a dateChanged event', () => {
           const value = new Date();
           spyOn(sut.dateChanged, 'emit');
           sut.valueChanged(value);

           expect(sut.dateChanged.emit).toHaveBeenCalledWith({value});
       });
   });
});
