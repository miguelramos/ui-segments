/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */
import {
  Inject,
  Injector,
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver
} from '@angular/core';



import { DOCUMENT } from '@angular/common';

import { UIOverlayRef } from './overlay-ref';
import { UIOverlayConfig } from './overlay-config';
import { UIOverlayContainer } from './overlay-container';
import { DomPortalOutlet } from '@segment/carbon/portal';

@Injectable()
export class UIOverlay {
  constructor(
    private _injector: Injector,
    private _appRef: ApplicationRef,
    private _overlayContainer: UIOverlayContainer,
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document: any
  ) { }

  create(config: UIOverlayConfig): UIOverlayRef {
    const panel = this._createDomElement();
    const outlet = this._createPortalOutlet(panel);

    this._containerPosition(config);

    return new UIOverlayRef(
      outlet,
      panel,
      config
    );
  }

  private _createDomElement(): HTMLElement {
    const key = Math.random().toString(36).substr(2, 10);
    const el = this._document.createElement('div') as HTMLElement;
    el.id = key;

    this._overlayContainer.getContainer().appendChild(el);

    return el;
  }

  private _containerPosition(config: UIOverlayConfig): void {
    const container = this._overlayContainer.getContainer();

    if (config.verticalPosition === 'bottom') {
      container.style.bottom = '1%';
    }

    if (config.verticalPosition === 'top') {
      container.style.top = '1%';
    }

    if (config.horizontalPosition === 'left') {
      container.style.left = '1%';
    }

    if (config.horizontalPosition === 'right') {
      container.style.right = '1%';
    }
  }

  private _createPortalOutlet(pane: HTMLElement): DomPortalOutlet {
    return new DomPortalOutlet(pane, this._componentFactoryResolver, this._appRef, this._injector);
  }
}
