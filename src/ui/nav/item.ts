/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://ui-segments.io/license
 */

import { Component, Output, OnDestroy, Input, Directive } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'ui-navbar-item, a[ui-navbar-item], div[ui-navbar-item]',
  templateUrl: 'item.html',
  host: {
    'class': 'navbar-item',
    '[class.has-dropdown]': 'hasDropdown',
    '[class.is-active]': 'isActive',
    '[class.has-dropdown-up]': 'hasDropdownUp',
    '(click)': '_onClick($event)'
  }
})
export class UINavItem implements OnDestroy {

  @Output()
  readonly onClick = new Subject<{ target: EventTarget; source: UINavItem }>();

  @Input()
  hasDropdown = false;

  @Input()
  hasDropdownUp = false;

  @Input()
  isActive = false;

  ngOnDestroy(): void {
    this.onClick.unsubscribe();
  }

  _onClick(ev: MouseEvent) {
    ev.preventDefault();

    this._setDropdownVisibility();
    this.onClick.next({ target: ev.currentTarget, source: this });
  }

  private _setDropdownVisibility() {
    if (this.hasDropdown) {
      this.isActive = !this.isActive;
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'ui-navbar-dropdown, div[ui-navbar-dropdown]',
  template: '<ng-content></ng-content>',
  host: {
    'class': 'navbar-dropdown',
    '[class.is-right]': 'isRight'
  }
})
export class UINavDropDown {
  @Input()
  isRight = false;
}

@Directive({
  selector: 'ui-navbar-link, a[ui-navbar-link]',
  host: {
    'class': 'navbar-link',
    '(click)': '_onClick($event)'
  }
})
export class UINavLink implements OnDestroy {
  @Output()
  readonly onClick = new Subject<MouseEvent>();

  ngOnDestroy() {
    this.onClick.unsubscribe();
  }

  _onClick(ev: MouseEvent) {
    ev.preventDefault();

    this.onClick.next(ev);
  }
}
