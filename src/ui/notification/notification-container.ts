/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */
import {
  Output,
  Component,
  ViewChild,
  ElementRef,
  ComponentRef,
  EmbeddedViewRef,
  ComponentFactoryResolver
} from '@angular/core';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal
} from '@segment/carbon/portal';

import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'ui-notification-container',
  templateUrl: 'notification-container.html',
  host: {
    'class': 'notification',
    'style': 'display: block;'
  }
})
export class UINotificationContainer extends BasePortalOutlet {

  @Output()
  readonly onDispose = new Subject();

  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  closeButton = true;

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

  addClasses(...classes: string[]): void {
    (this._elRef.nativeElement as HTMLElement).classList.add(...classes);
  }

  setSize(width: number, heigth: number) {
    (this._elRef.nativeElement as HTMLElement).style.width = `${width}px`;
    (this._elRef.nativeElement as HTMLElement).style.height = `${heigth}px`;
  }

  onClose(ev: MouseEvent) {
    ev.preventDefault();

    this.onDispose.next();
  }
}
