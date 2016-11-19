import { Component, ViewChild, EventEmitter, Output, Input } from '@angular/core';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/lesser-dark.css');

import * as CodeMirror from 'codemirror';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';

import CODE_MIRROR_EVENTS from './code-mirror-events.const';

@Component({
    selector: 'sh-scenario-editor',
    template: '<div #codeEditor></div>'
})
export class ScenarioEditorComponent {

    @ViewChild('codeEditor') codeEditorElement;
    @Input() scenario: string;
    @Output() updateScenario = new EventEmitter();

    private codeMirror: Function;
    private codeEditor: CodeMirror.Editor;

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
