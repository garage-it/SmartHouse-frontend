import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
    get nativeWindow(): Window {
        return window;
    }
}
