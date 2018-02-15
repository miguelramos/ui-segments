/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

import { Component, OnInit } from '@angular/core';
import { UINotification } from '@segment/ui/notification';

@Component({
  moduleId: module.id,
  selector: 'ng-notify',
  template: `<h1>My Custom Notification</h1>`
})
export class Notify {}

@Component({
  moduleId: module.id,
  selector: 'ng-ui-home',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  preserveWhitespaces: false,
})
export class Home implements OnInit {

  constructor(
    private _notification: UINotification
  ) { }

  ngOnInit() {
    // this._notification.openFromComponent(Notify, {});
  }
}
