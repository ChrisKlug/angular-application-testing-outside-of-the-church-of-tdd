import { DebounceDirective } from './debounce.directive';
import { timer } from 'rxjs';
import { async, fakeAsync, tick } from '@angular/core/testing';

describe('DebounceDirective', () => {
    let directive: DebounceDirective;

    beforeEach(() => {
        directive = new DebounceDirective();
    })

    beforeEach(() => {
        directive.ngOnInit();
    })

    afterEach(() => {
        directive.ngOnDestroy();
    })

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('emits when given more than 2 characters', (done) => {
        let val: string;

        directive.onDebounce.subscribe(x => val = x)

        directive.onInput("abc");

        timer(300).subscribe(x => {
            expect(val).toBe("abc");
            done();
        })
    })

    it('emits when given more than 2 characters', async(() => {
        let val: string;
    
        directive.onDebounce.subscribe(x => val = x)
    
        directive.onInput("abc");
    
        timer(300).subscribe(x => {
            expect(val).toBe("abc");
        })
    }))

    it('emits when given more than 2 characters', fakeAsync(() => {
        let val: string;
    
        directive.onDebounce.subscribe(x => val = x)
    
        directive.onInput("abc");
    
        tick(300);
    
        expect(val).toBe("abc");
    }))
});
