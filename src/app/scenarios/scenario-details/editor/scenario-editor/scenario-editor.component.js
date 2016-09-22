import { Component, ViewChild, EventEmitter, Output } from '@angular/core';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/lesser-dark.css';

import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/mode/javascript/javascript.js';

import CODE_MIRROR_EVENTS from './code-mirror-events.const.js';

const selector = 'scenario-editor';

@Component({
    selector,
    template: '<div #codeEditor></div>',
    inputs: ['scenario']
})
export class ScenarioEditorComponent {
    @ViewChild('codeEditor') codeEditorElement;
    @Output() updateScenario = new EventEmitter();

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
