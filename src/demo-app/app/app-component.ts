/**
 * @license
 * Copyright UI-Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://ui-segments.io/license
 */

import { Component, ViewEncapsulation } from '@angular/core';

import { UINavItem } from '@segment/ui/nav';

@Component({
  moduleId: module.id,
  selector: 'entry-app',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class EntryApp { }

@Component({
  moduleId: module.id,
  selector: 'ng-ui-app',
  templateUrl: 'app.html',
  styleUrls: ['app.css'],
  preserveWhitespaces: false,
})
export class DemoApp {
  onBurgerChange(event: { target: HTMLElement, active: boolean }) {
    console.group('BURGER CHANGE');
    console.dir(event);
    console.groupEnd();
  }

  onItemClick(event: { target: HTMLElement; source: UINavItem }) {
    console.group('ITEM CLICK');
    console.dir(event);
    console.groupEnd();
  }
}
