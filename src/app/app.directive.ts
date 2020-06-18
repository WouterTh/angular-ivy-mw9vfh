
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberInput]'
})
export class AppDirective {
  private readonly regex = /^-?[0-9]*(,[0-9]*){0,1}$/g;
  private readonly specialKeys = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private readonly el: ElementRef) { }

    @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const next = this.el.nativeElement.value.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}