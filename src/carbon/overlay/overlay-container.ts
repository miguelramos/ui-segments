/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */
import {
  Inject,
  OnDestroy,
  Injectable,
  SkipSelf,
  Optional,
  InjectionToken
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

@Injectable()
export class UIOverlayContainer implements OnDestroy {
  private _container: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private _document: any
  ) { }

  ngOnDestroy() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
  }

  getContainer(): HTMLElement {
    if (!this._container) { this._createContainerElement(); }

    return this._container;
  }

  private _createContainerElement(): void {
    const container = this._document.createElement('div');

    container.classList.add('ui-overlay-container');

    this._styleContainer(container);
    this._document.body.appendChild(container);
    this._container = container;
  }

  private _styleContainer(container: HTMLElement): void {
    container.style.position = 'absolute';
    // container.style.top = '0';
    // container.style.bottom = '0';
    // container.style.right = '0';
    // container.style.left = '0';
    // container.style.width = '100%';
    // container.style.height = '100%';
    container.style.zIndex = '999';
  }
}

export function factoryContainer(parent: UIOverlayContainer, doc: any) {
  return parent || new UIOverlayContainer(doc);
}

export const UIOVERLAY_CONTAINER_PROVIDER = {
  provide: UIOverlayContainer,
  deps: [
    [new Optional(), new SkipSelf, UIOverlayContainer],
    DOCUMENT as InjectionToken<any>
  ],
  useFactory: factoryContainer
}
