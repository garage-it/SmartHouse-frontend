import {Component, ViewChild, Injectable, EventEmitter, Output} from 'angular2/core';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/lesser-dark.css');

const CodeMirror = require('codemirror/lib/codemirror');
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';

import CODE_MIRROR_EVENTS from './CODE_MIRROR_EVENTS';

const selector = 'scenario-editor';

@Component({
    selector,
    template: '<div #codeEditor></div>',
    inputs: ['scenario']
})

@Injectable()
export class ScenarioEditor {
    @ViewChild('codeEditor') codeEditorElement;
    @Output() updateScenario = new EventEmitter();

    codeEditor: any;
    codeMirror: any;
    scenario: any;

    constructor() {
        this.codeMirror = CodeMirror;
    }

    ngAfterViewInit() {
        this.initCodeEditor();
    }

    ngOnChanges() {
        if (this.codeEditor && this.scenario !== this.codeEditor.getValue()) {
            this.codeEditor.setValue(this.scenario);
        }
    }

    initCodeEditor() {
        this.codeEditor = this.codeMirror(
            this.codeEditorElement.nativeElement,
            {
                mode: 'javascript',
                lineNumbers: true,
                autoCloseBrackets: true,
                matchBrackets: true,
                tabSize: 4,
                theme: 'lesser-dark'
            }
        );

        this.initListeners();
    }

    initListeners() {
        this.codeEditor.on('change', (codeMirror, changeObj) => {
            if (changeObj.origin !== CODE_MIRROR_EVENTS.SET_VALUE_EVENT) {
                const scenarioBody = this.codeEditor.getValue();
                this.updateScenario.emit({scenarioBody});
            }
        });
    }
}
