import { EditScenarioEditorComponent } from './edit-scenario-editor.component';
import { Observable } from 'rxjs';

describe('EditScenarioEditorComponent', () => {
    let scenario;
    let sut;
    let ScenarioService;
    let Router;
    let ActivatedRoute;
    let DialogService;
    let ViewContainerRef;

    const id = 123;

    beforeEach(() => {

        ScenarioService = {
            get: jasmine.createSpy('get'),
            update: jasmine.createSpy('update'),
            delete: jasmine.createSpy('delete')
        };
        Router = {};
        ActivatedRoute = {
            snapshot: {
                params: {
                    id: id
                }
            }
        };
        DialogService = {
            confirm: jasmine.createSpy('confirm')
        };
        ViewContainerRef = {};
        scenario = {
            iam: 'a scenario'
        };

        sut = new EditScenarioEditorComponent(
            ScenarioService,
            Router,
            ActivatedRoute,
            DialogService,
            ViewContainerRef);
        sut.back = jasmine.createSpy('back');
    });

    it('should NOT allow switch to wizard', () => {
        expect(sut.isWizardAvailable()).toEqual(false);
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            ScenarioService.get.and.returnValue(Observable.of(scenario));
            sut.ngOnInit();
        });

        it('should fetch scenario with id from route params', () => {
            expect(ScenarioService.get).toHaveBeenCalledWith(id);
        });

        it('should save fetched scenario', () => {
            expect(sut.scenario).toEqual(scenario);
        });
    });

    describe('Save scenario', () => {
        beforeEach(() => {
            ScenarioService.update.and.returnValue(Observable.of(scenario));
            sut.save(scenario);
        });

        it('should update scenario', () => {
            expect(ScenarioService.update).toHaveBeenCalledWith(scenario);
        });

        it('should go back', () => {
            expect(sut.back).toHaveBeenCalled();
        });
    });

    describe('Delete scenario', () => {
        describe('before user confirmation', () => {
            const confirmOptions = {
                title: '',
                message: 'Are you sure you want to delete this scenario?'
            };

            beforeEach(() => {
                DialogService.confirm.and.returnValue(Observable.of(false));
                sut.delete(scenario);
            });

            it('should show confirm dialog with proper view container ref and options', () => {
                expect(DialogService.confirm).toHaveBeenCalledWith(ViewContainerRef, confirmOptions);
            });

            it('should not remove scenario if user cancel confirmation', () => {
                expect(ScenarioService.delete).not.toHaveBeenCalled;
            });

            describe('should remove scenario if user confirms', () => {
                beforeEach(() => {
                    ScenarioService.delete.and.returnValues(Observable.of(1));
                    DialogService.confirm.and.returnValue(Observable.of(true));
                    sut.delete(scenario);
                });

                it('should remove scenario', () => {
                    expect(ScenarioService.delete).toHaveBeenCalledWith(scenario);
                });

                it('should navigate back on remove', () => {
                    expect(sut.back).toHaveBeenCalled();
                });
            });
        });
    });
});
