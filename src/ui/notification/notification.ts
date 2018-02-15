/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

import {
  Component,
  Injectable,
  ViewChild,
  ElementRef,
  ComponentRef,
  EmbeddedViewRef
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal
} from '@segment/carbon/portal';

import { UINotificationConfig } from './notification-config';

@Component({
  moduleId: module.id,
  selector: 'ui-notification-container',
  template: `<ng-template cdkPortalOutlet></ng-template>`
})
export class UINotificationContainer extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  constructor(
    private _elRef: ElementRef
  ) {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal(): EmbeddedViewRef<any> {
    throw Error('Not yet implemented');
  }
}

@Injectable()
export class UINotification {}
