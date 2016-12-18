import { DateRangeComponent } from './date-range.component';
describe('DateRangeComponent', () => {
    let sut;
    beforeEach(() => {
       sut = new DateRangeComponent();
    });

   describe('#startDateChanged', () => {
       it('should emit a rangeChanged event', () => {
           const date = new Date();
           sut.startDate = sut.endDate = date;

           spyOn(sut.rangeChanged, 'emit');
           sut.startDateChanged(date);

           expect(sut.rangeChanged.emit).toHaveBeenCalledWith({
               startDate: date,
               endDate: date
           });
       });
   });

   describe('#endDateChanged', () => {
       it('should emit a rangeChanged event', () => {
           const date = new Date();
           sut.startDate = sut.endDate = date;

           spyOn(sut.rangeChanged, 'emit');
           sut.endDateChanged(date);

           expect(sut.rangeChanged.emit).toHaveBeenCalledWith({
               startDate: date,
               endDate: date
           });
       });
   });
});
