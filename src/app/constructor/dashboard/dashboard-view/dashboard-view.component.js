"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DashboardViewComponent = (function () {
    function DashboardViewComponent(dialogService, viewContainerRef, router, dashboardConstructorService) {
        this.dialogService = dialogService;
        this.viewContainerRef = viewContainerRef;
        this.router = router;
        this.dashboardConstructorService = dashboardConstructorService;
        this.widgets = [];
        this.onRemoveWidget = new core_1.EventEmitter();
    }
    DashboardViewComponent.prototype.removeWidget = function (widget) {
        this.onRemoveWidget.emit(widget);
    };
    DashboardViewComponent.prototype.cancel = function () {
        var _this = this;
        var confirmOptions = {
            title: '',
            message: 'Do you want to exit without saving?',
            ok: 'Yes',
            cancel: 'No'
        };
        this.dialogService.confirm(this.viewContainerRef, confirmOptions)
            .filter(function (isConfirmed) { return isConfirmed; })
            .subscribe(function () {
            _this.router.navigate(['/']);
        });
    };
    DashboardViewComponent.prototype.save = function () {
        var _this = this;
        this.dashboardConstructorService.saveDashboard(this.widgets)
            .subscribe(function () { return _this.router.navigate(['/dashboard']); }); // TODO Should be changed on new dashboard view
    };
    __decorate([
        core_1.Input()
    ], DashboardViewComponent.prototype, "widgets", void 0);
    __decorate([
        core_1.Output()
    ], DashboardViewComponent.prototype, "onRemoveWidget", void 0);
    DashboardViewComponent = __decorate([
        core_1.Component({
            selector: 'sh-dashboard-view',
            templateUrl: './dashboard-view.template.html',
            styleUrls: ['dashboard-view.template.scss', './dashboard-view.template.scss']
        })
    ], DashboardViewComponent);
    return DashboardViewComponent;
}());
exports.DashboardViewComponent = DashboardViewComponent;
