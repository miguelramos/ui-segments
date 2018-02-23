/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

import { Component, AfterViewInit } from '@angular/core';
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
export class Home {

  progressValue = 0;
  messageImageReady = 'Image is loading...';

  constructor(
    private _notification: UINotification
  ) { }

  open() {
    this._notification.openWithComponent(Notify, {
      duration: 0,
      width: 400,
      height: 90,
      data: {
        key: 'hello'
      }
    });
  }

  imageReady(image: HTMLImageElement) {
    console.dir(image);
    this.messageImageReady = 'Image loaded!!';
  }

  imageProgress(progress: number) {
    this.progressValue = progress;
  }
}
