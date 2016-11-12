import { DialogService } from './dialog.service';
import { MdDialogConfig } from '@angular/material';
import { DialogConfirmComponent } from './dialog-confirm.component';

describe('DialogService', () => {
    let sut;
    let ViewContainerRef;
    let MdDialog;
    let dialogRef;
    let observable;

    beforeEach(() => {
        ViewContainerRef = {};

        dialogRef = {
            componentInstance: {},
            afterClosed() { return observable; }
        };

        MdDialog = {
            open: jasmine.createSpy('open').and.returnValue(dialogRef)
        };

        sut = new DialogService(MdDialog);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    describe('#confirm', () => {
        let result;

        it('should open dialog with confirm component and config', () => {
            result = sut.confirm(ViewContainerRef);

            let config = new MdDialogConfig();
            config.viewContainerRef = ViewContainerRef;

            expect(MdDialog.open).toHaveBeenCalledWith(DialogConfirmComponent, config);
        });

        it('should return observable after close', () => {
            expect(result).toEqual(observable);
        });

        describe('when no additional dialog options', () => {
            it('should not override component properties', () => {
                sut.confirm(ViewContainerRef);
                expect(dialogRef.componentInstance).toEqual({});
            });
        });

        describe('when additional dialog options', () => {
            const options = {
                title: Math.random()
            };

            it('should override component properties with proper options', () => {
                sut.confirm(ViewContainerRef, options);
                expect(dialogRef.componentInstance).toEqual(options);
            });
        });
    });
});
