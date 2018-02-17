/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

import {
  Injector,
  Inject,
  Component,
  Injectable,
  ViewChild,
  ApplicationRef,
  ElementRef,
  ComponentRef,
  EmbeddedViewRef,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { Subject } from 'rxjs/Subject';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  ComponentType,
  DomPortalOutlet
} from '@segment/carbon/portal';

import { UINotificationConfig } from './notification-config';
import { UIOverlay, UIOverlayRef } from '@segment/carbon/overlay';

@Component({
  moduleId: module.id,
  selector: 'ui-notification-container',
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
export class UINotification {
  view: any;
  constructor(
    private _overlay: UIOverlay,
    private _injector: Injector
  ) { }

  openWithComponent<T>(component: ComponentType<T>, config?: UINotificationConfig) {
    // Promise.resolve().then(() => {});
    this._attach(component, config);
  }

  private _attachContainer(overlayRef: UIOverlayRef) {
    const container = new ComponentPortal(UINotificationContainer, undefined, this._injector);
    const containerRef: ComponentRef<UINotificationContainer> = overlayRef.attach(container);

    return containerRef.instance;
  }

  private _attach<T>(component: ComponentType<T>, config?: UINotificationConfig) {
    const overlayRef = this._createOverlay(config);
    const container = this._attachContainer(overlayRef);
    const portal = new ComponentPortal(component, undefined, this._injector);

    container.attachComponentPortal(portal);
  }

  private _createOverlay(config?: UINotificationConfig): UIOverlayRef {
    console.dir(config);
    return this._overlay.create({});
  }
}
