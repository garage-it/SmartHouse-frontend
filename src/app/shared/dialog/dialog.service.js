"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
var dialog_confirm_component_1 = require('./dialog-confirm.component');
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.confirm = function (viewContainerRef, options) {
        var dialogRef;
        var config = new material_1.MdDialogConfig();
        config.viewContainerRef = viewContainerRef;
        dialogRef = this.dialog.open(dialog_confirm_component_1.DialogConfirmComponent, config);
        Object.assign(dialogRef.componentInstance, options);
        return dialogRef.afterClosed();
    };
    DialogService = __decorate([
        core_1.Injectable()
    ], DialogService);
    return DialogService;
}());
exports.DialogService = DialogService;
