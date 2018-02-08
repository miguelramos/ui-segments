import { Component, Attribute, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ui-navbar-menu',
  templateUrl: 'menu.html',
  host: {
    'class': 'navbar-menu',
    '[class.is-active]': 'isActive'
  }
})
export class UINavMenu {

  @Input()
  isActive = false;

  constructor(
    @Attribute('id') private id: string
  ) {}
}
