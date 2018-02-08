import {
  Component,
  AfterContentInit,
  ContentChildren,
  QueryList,
  OnDestroy,
  Input,
  Renderer2,
  NgZone
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { UINavMenu } from './menu';
import { UINavBurger } from './brand';

@Component({
  moduleId: module.id,
  selector: 'ui-nav, nav[ui-nav]',
  templateUrl: 'nav.html',
  styleUrls: ['nav.css'],
  host: {
    'role': 'navigation',
    'aria-label': 'main navigation',
    'class': 'navbar',
    '[class.is-transparent]': 'isTransparent',
    '[class.is-fixed-top]': 'isFixedTop',
    '[class.is-fixed-bottom]': 'isFixedBottom'
  }
})
export class UINav implements AfterContentInit, OnDestroy {
  @ContentChildren(UINavMenu)
  uiNavMenu: QueryList<UINavMenu>;

  @ContentChildren(UINavBurger, {descendants: true})
  uiNavBurger: QueryList<UINavBurger>;

  @Input()
  isTransparent = false;

  @Input()
  set isFixedTop(fixed: boolean) {
    this._isFixedTop = fixed;
    this._setHtmFixed('top');
  }
  get isFixedTop() {
    return this._isFixedTop;
  }

  @Input()
  set isFixedBottom(fixed: boolean) {
    this._isFixedBottom = fixed;
    this._setHtmFixed('bottom');
  }
  get isFixedBottom() {
    return this._isFixedBottom;
  }

  private _isFixedTop = false;
  private _isFixedBottom = false;
  private _uiNavBurgerSubscription: Subscription;

  constructor(
    private render: Renderer2,
    private zone: NgZone
  ) {}

  ngAfterContentInit() {
    if (this.uiNavBurger.length) {
      this._uiNavBurgerSubscription = this.uiNavBurger.first.onChange.subscribe(
        (event) => this._activateMenu(event.active)
      );
    }
  }

  ngOnDestroy() {
    this._uiNavBurgerSubscription.unsubscribe();
  }

  private _activateMenu(active: boolean) {
    if (this.uiNavMenu.length) {
      this.uiNavMenu.first.isActive = active;
    }
  }

  private _setHtmFixed(position: string) {
    const htmlClass = (cls: string, add: boolean) => {
      this.zone.runOutsideAngular(() => {
        add ?
          this.render.addClass(document.documentElement, cls) :
          this.render.removeClass(document.documentElement, cls);
      });
    };

    switch (position) {
      case 'top':
        htmlClass('has-navbar-fixed-top', this._isFixedTop);
        break;
      case 'bottom':
        htmlClass('has-navbar-fixed-bottom', this._isFixedBottom);
        break;
      default:
        break;
    }
  }
}
