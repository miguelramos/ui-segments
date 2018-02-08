import { Routes } from '@angular/router';

import { DemoApp } from './app-component';
import { Home } from './home/home-component';

export const DEMO_APP_ROUTES = [
  {
    path: '', component: DemoApp, children: [
      { path: '', component: Home },
    ]
  }
];

export const ALL_ROUTES: Routes = [
  {path: '',  component: DemoApp, children: DEMO_APP_ROUTES}
];