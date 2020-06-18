import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { AppDirective } from './app.directive';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule ],
  declarations: [ AppComponent, AppDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
