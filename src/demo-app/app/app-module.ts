import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DEMO_APP_ROUTES } from './routes';
import { DemoUIModule } from '../demo-ui-module';

import { DemoApp } from './app-component';
import { Home, Notify } from './home/home-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DEMO_APP_ROUTES),
    DemoUIModule
  ],
  declarations: [
    Home,
    Notify,
    DemoApp
  ],
  entryComponents: [
    DemoApp, Notify
  ]
})
export class AppModule {}
