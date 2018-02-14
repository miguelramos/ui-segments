/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

import { Component, Input, Output, Renderer2, ElementRef } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'ui-button, a[ui-button], button[ui-button]',
  templateUrl: 'button.html',
  host: {
    'class': 'button',
    '[class.is-rounded]': 'isRounded',
    '[class.is-loading]': 'isLoading',
    '[class.is-active]': 'isActive',
    '[class.is-static]': 'isStatic',
    // '[attr.disabled]': 'isDisabled',
    '(click)': '_onClick($event)'
  }
})
export class UIButton {

  @Input()
  isRounded = false;

  @Input()
  isLoading = false;

  @Input()
  isActive = false;

  @Input()
  isStatic = false;

  @Input()
  set isDisabled(disabled: boolean) {
    if (disabled) {
      this.render.setAttribute(this.elRef.nativeElement, 'disabled', '');
    } else {
      this.render.removeAttribute(this.elRef.nativeElement, 'disabled');
    }

    this._isDisabled = disabled;
  }
  get isDisabled() {
    return this._isDisabled;
  }

  @Output()
  readonly onClick = new Subject<{ target: EventTarget }>();

  private _isDisabled = false;

  constructor(
    private elRef: ElementRef,
    private render: Renderer2
  ) {}

  _onClick(ev: MouseEvent) {
    ev.preventDefault();

    this.onClick.next({ target: ev.currentTarget });
  }
}
