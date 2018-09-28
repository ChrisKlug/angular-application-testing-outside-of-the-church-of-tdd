import { Directive, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged } from 'rxjs/operators'

@Directive({
  selector: 'input[debounce]'
})
export class DebounceDirective implements OnInit, OnDestroy {

  private _subject = new Subject<string>();
  private _subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this._subscription = this._subject.pipe(
      debounceTime(300), 
      filter(x => x.length > 2 || x.length == 0),
      distinctUntilChanged()
    ).subscribe(x => {
      this.onDebounce.emit(x)
    })
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  @HostListener("input", ["$event.target.value"]) onInput(value: string) {
    this._subject.next(value)
  }
  @Output('debounce') onDebounce = new EventEmitter<string>();

}
