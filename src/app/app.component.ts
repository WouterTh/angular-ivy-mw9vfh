import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _ngDestroyed = new Subject();
  timeOutCtrl = new FormControl(600);
  displayCtrl = new FormControl();
  ctrl = new FormControl();

  timeOut = 600;

  ngOnDestroy(): void {
    this._ngDestroyed.next();
    this._ngDestroyed.complete();
  }

  ngOnInit(): void {
    this.timeOutCtrl.valueChanges.pipe(
      debounceTime(1000),
      takeUntil(this._ngDestroyed)
    ).subscribe({
      next: (val: any) => {
        const timeOut = parseInt(val, 10);
        if(!isNaN(timeOut)){
          this.timeOut = timeOut < 0 ? timeOut * -1 : timeOut;
        }
 this.displayCtrl.valueChanges
        .pipe(
          debounceTime(this.timeOut),
          takeUntil(this.timeOutCtrl.valueChanges)
        )
        .subscribe({
          next: (val: any) => this.displayValueChanged(this.ctrl, val)
        });
      }
    });
    this.displayCtrl.valueChanges
        .pipe(
          debounceTime(this.timeOut),
          takeUntil(this.timeOutCtrl.valueChanges)
        )
        .subscribe({
          next: (val: any) => this.displayValueChanged(this.ctrl, val)
        });

          this.ctrl.valueChanges
        .pipe(
          takeUntil(this._ngDestroyed)
        )
        .subscribe({
          next: (val: any) => this.ctrlValueChanged(this.displayCtrl, val)
        });
  }

   private readonly ctrlValueChanged = (displayCtrl: AbstractControl, value: number | string): void => {
    if (!(value === undefined || value === null) && typeof value === "number" && displayCtrl && displayCtrl.value !== this.toDisplay(value)) {
      displayCtrl.setValue(this.toDisplay(value));
    }
  };

  private readonly displayValueChanged = (control: AbstractControl, value: string): void => {
    if (!(value === undefined || value === null) && value !== '') {
      const newValue = this.toNumber(value);
      if (!isNaN(newValue) && control && control.value !== newValue) {
        control.setValue(newValue);
      }
    } else {
        control.setValue(null);
    }
  };

  private readonly toNumber = (value: any, decimalSeparator = ','): number =>
    value ? parseFloat(value.toString().replace(decimalSeparator, '.')) : 0;

  private readonly toDisplay = (value: number): string =>
    value.toFixed(2).replace('.', ',');
}
