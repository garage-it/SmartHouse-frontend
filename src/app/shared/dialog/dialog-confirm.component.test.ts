import { async, TestBed } from '@angular/core/testing';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { MdDialogRef } from '@angular/material';

class MdDialogRefMock {}

describe('dialog-confirm', () => {
    let sut;
    let mdDialogRef;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DialogConfirmComponent ],
            providers: [
                {provide: MdDialogRef, useClass: MdDialogRefMock }
            ]
        })
        .compileComponents()
        .then(() => {
            sut = TestBed.createComponent(DialogConfirmComponent).componentInstance;
            mdDialogRef = TestBed.get(MdDialogRef);
            mdDialogRef.close = jasmine.createSpy('mdDialogRef.close');
        });
    }));

    describe('#init', () => {
        it('should have reference to opened dialog', () => {
            expect(sut.dialogRef).toEqual(mdDialogRef);
        });

        it('should have default text for title', () => {
            expect(sut.title).toBeDefined();
        });

        it('should have default text for message', () => {
            expect(sut.message).toBeDefined();
        });

        it('should have default text for confirm button', () => {
            expect(sut.ok).toBeDefined();
        });

        it('should have default text for reject button', () => {
            expect(sut.cancel).toBeDefined();
        });
    });

    describe('#close', () => {
        it('should close the dialog', () => {
            sut.close();
            expect(mdDialogRef.close).toHaveBeenCalled();
        });
    });

    describe('#confirm', () => {
        it('should confirm the dialog', () => {
            sut.confirm();
            expect(mdDialogRef.close).toHaveBeenCalledWith(true);
        });
    });
});
