import { Injectable } from '@angular/core';

@Injectable()
export class ChartPeriodFormatterService {

    getLabels(data, period) {
        let result = [];
        let dates = data.map(({date}) => this.transformDateString(date));
        switch (period) {
            case 'week':
                result = this.getByWeek(dates);
                break;
            case 'month':
                result = this.getByMonth(dates);
                break;
            case 'year':
                result = this.getByYear(dates);
                break;
            default: result = this.getByDay(dates);
        }
        return result;
    }

    private getByDay(dates) {
        return dates.map(item => item.getHours());
    }

    private getByWeek(dates) {
        let week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        return dates
            .map(item => item.getDay())
            .map(item => week[item]);
    }

    private getByMonth(dates) {
        return dates
            .map(item => item.getDate());
    }

    private getByYear(dates) {
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'];

        return dates
            .map(item => item.getMonth())
            .map(item => month[item]);
    }

    private transformDateString(date) {
        return (new Date(date));
    }
}
