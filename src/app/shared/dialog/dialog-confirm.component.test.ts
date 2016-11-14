import { DialogConfirmComponent } from './dialog-confirm.component';

describe('dialog-confirm', () => {
    let sut;
    let mdDialogRef;

    beforeEach(() => {
        mdDialogRef = jasmine.createSpyObj('mdDialogRef', ['close']);
        sut = new DialogConfirmComponent(mdDialogRef);
    });

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
