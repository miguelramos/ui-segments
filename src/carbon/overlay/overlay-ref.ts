/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments/license
 */
import { Optional } from '@angular/core';


import { UIOverlayConfig } from './overlay-config';
import { PortalOutlet, Portal } from '@segment/carbon/portal';

export class UIOverlayRef implements PortalOutlet {

  constructor(
    private _portalOutlet: PortalOutlet,
    private _element: HTMLElement,
    private _config: UIOverlayConfig
  ) { }

  get overlayElement(): HTMLElement {
    return this._element;
  }

  attach(portal: Portal<any>) {
    const attach = this._portalOutlet.attach(portal);

    this._updateSize();
    console.dir(this);

    return attach;
  }

  detach() {
    this._portalOutlet.detach();
  }

  hasAttached() {
    return this._portalOutlet.hasAttached();
  }

  dispose() {
    this._portalOutlet.dispose();
  }

  private _updateSize() {
    if (this._config.width || this._config.width === 0) {
      (this._element.parentElement as HTMLElement).style.width = formatCssUnit(this._config.width);
    }

    if (this._config.height || this._config.height === 0) {
      (this._element.parentElement as HTMLElement)
        .style.height = formatCssUnit(this._config.height);
    }
  }
}

function formatCssUnit(value: number | string) {
  return typeof value === 'string' ? value as string : `${value}px`;
}
