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

    return new UIOverlayRef(
      outlet,
      panel,
      config
    );
  }

  private _createDomElement(): HTMLElement {
    const el = this._document.createElement('div');
    this._overlayContainer.getContainer().appendChild(el);

    return el;
  }

  private _createPortalOutlet(pane: HTMLElement): DomPortalOutlet {
    return new DomPortalOutlet(pane, this._componentFactoryResolver, this._appRef, this._injector);
  }
}
