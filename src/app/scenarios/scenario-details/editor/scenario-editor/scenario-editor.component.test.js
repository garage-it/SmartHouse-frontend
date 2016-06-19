import {ScenarioEditor} from './scenario-editor.component.js';
import CODE_MIRROR_EVENTS from './code-mirror-events.const.js';

describe('ScenarioEditor', () => {
    let sut;
    let codeMirrorMock;
    const domElMock = 'element';

    beforeEach(() => {
        codeMirrorMock = jasmine.createSpyObj('CodeMirror', ['on', 'setValue', 'getValue']);

        sut = new ScenarioEditor();

        spyOn(sut, 'codeMirror').and.returnValue(codeMirrorMock);
        spyOn(sut.updateScenario, 'emit');
        sut.codeEditorElement = {
            nativeElement: domElMock
        };

        sut.ngAfterViewInit();
    });

    describe('#ngAfterViewInit', () => {
        it('should initialize a scenario editor', () => {
            expect(sut.codeMirror).toHaveBeenCalledWith(domElMock, jasmine.any(Object));
            expect(sut.codeEditor).toEqual(codeMirrorMock);
        });

        it('should add listener to handle a scenario changes', () => {
            expect(sut.codeEditor.on).toHaveBeenCalledWith('change', jasmine.any(Function));
        });

        describe('on scenario change', () => {
            let onScenarioChange;
            const scenarioBody = 'changed scenario';

            beforeEach(() => {
                onScenarioChange = sut.codeEditor.on.calls.mostRecent().args[1];
                codeMirrorMock.getValue.and.returnValue(scenarioBody);
            });

            describe('when is key change', () => {
                beforeEach(() => {
                    onScenarioChange(null, {origin: 'RANDOM'});
                });

                it('should get current editor content when a change occurs', () => {
                    expect(sut.codeEditor.getValue).toHaveBeenCalledWith();
                });

                it('should emit an event with changed scenario', () => {
                    expect(sut.updateScenario.emit).toHaveBeenCalledWith({scenarioBody});
                });
            });

            describe('when is set value from model', () => {
                beforeEach(() => {
                    onScenarioChange(null, {origin: CODE_MIRROR_EVENTS.SET_VALUE_EVENT});
                });

                it('should not get current editor content', () => {
                    expect(sut.codeEditor.getValue).not.toHaveBeenCalled();
                });

                it('should emit an event with changed scenario', () => {
                    expect(sut.updateScenario.emit).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('#ngOnChanges', () => {
        it('should set editor content when input is changed', () => {
            sut.scenario = 'Scenario';
            sut.ngOnChanges();
            expect(sut.codeEditor.setValue).toHaveBeenCalledWith(sut.scenario);
        });
    });
});
