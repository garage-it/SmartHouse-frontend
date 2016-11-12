import { DialogService } from './dialog.service';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { TestBed, async } from '@angular/core/testing';

class MdDialogMock {}

describe('DialogService', () => {
    let sut;
    let viewContainerRef;
    let mdDialogMock;
    let dialogRef;
    let observable;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MdDialog, useClass: MdDialogMock },
                DialogService
            ]
        })
        .compileComponents()
        .then(() => {
            viewContainerRef = {};

            mdDialogMock = TestBed.get(MdDialog);

            dialogRef = {
                componentInstance: {},
                afterClosed() { return observable; }
            };
            mdDialogMock.open = jasmine.createSpy('mdDialogMock.open').and.returnValue(dialogRef);

            sut = TestBed.get(DialogService);
        });
    }));

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    describe('#confirm', () => {
        const options = {
            title: Math.random()
        };

        let result;

        beforeEach(() => {
            result = sut.confirm(viewContainerRef, options);
        });

        it('should open dialog with confirm component and config', () => {
            let config = new MdDialogConfig();
            config.viewContainerRef = viewContainerRef;

            expect(mdDialogMock.open).toHaveBeenCalledWith(DialogConfirmComponent, config);
        });

        it('should override component properties with proper options', () => {
            expect(dialogRef.componentInstance).toEqual(options);
        });

        it('should return observable after close', () => {
            expect(result).toEqual(observable);
        });
    });
});
