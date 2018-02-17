/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments/license
 */
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
}
