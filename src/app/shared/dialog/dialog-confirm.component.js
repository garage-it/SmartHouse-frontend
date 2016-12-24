"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DialogConfirmComponent = (function () {
    function DialogConfirmComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.title = 'Confirm';
        this.message = 'Are you sure?';
        this.ok = 'Ok';
        this.cancel = 'Cancel';
    }
    DialogConfirmComponent.prototype.confirm = function () {
        this.dialogRef.close(true);
    };
    DialogConfirmComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    DialogConfirmComponent = __decorate([
        core_1.Component({
            selector: 'sh-dialog-confirm',
            templateUrl: './dialog-confirm.html'
        })
    ], DialogConfirmComponent);
    return DialogConfirmComponent;
}());
exports.DialogConfirmComponent = DialogConfirmComponent;
