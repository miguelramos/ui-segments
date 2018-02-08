import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UINav } from './nav';
import { UINavMenu } from './menu';
import { UINavBrand, UINavBurger } from './brand';
import { UINavItem, UINavDropDown, UINavLink } from './item';

@NgModule({
  imports: [CommonModule],
  declarations: [
    UINav,
    UINavLink,
    UINavDropDown,
    UINavBurger,
    UINavItem,
    UINavMenu,
    UINavBrand
  ],
  exports: [
    UINav,
    UINavLink,
    UINavMenu,
    UINavDropDown,
    UINavBurger,
    UINavItem,
    UINavBrand
  ]
})
export class UINavModule {}
