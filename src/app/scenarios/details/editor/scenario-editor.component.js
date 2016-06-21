import {Component, ViewChild, Injectable, EventEmitter, Output} from 'angular2/core';

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
    inputs: ['script']
})

@Injectable()
export class ScenarioEditor {
    @ViewChild('codeEditor') codeEditorElement;

    constructor() {
        this.codeMirror = CodeMirror;
    }

    ngAfterViewInit() {
        this.initCodeEditor();
    }

    ngOnChanges() {
        if (this.codeEditor && this.script !== this.codeEditor.getValue()) {
            this.codeEditor.setValue(this.script);
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
    }

    getRaw (){
        return this.codeEditor.getValue();
    }
}
