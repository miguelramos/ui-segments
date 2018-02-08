import { Output, Directive, HostListener, AfterViewInit, InjectionToken, Inject } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { between } from './helpers';

export interface Breakpoints {
  XS: number;
  SM: number;
  MD: number;
  LG: number;
  XL: number;
}

export const DEFAULT_RESPONSIVE_BREAKPOINTS_TOKEN: Breakpoints = {
  XS: 575,
  SM: 767,
  MD: 991,
  LG: 1199,
  XL: 1200
};

export const RESPONSIVE_BREAKPOINTS_TOKEN = new InjectionToken<Breakpoints>('[RESPONSIVE] Breakpoints definitions.')

@Directive({
  selector: 'ui-responsive, [ui-responsive]',
  exportAs: 'uiResponsive'
})
export class UIResponsiveBreakpoints implements AfterViewInit {
  breakpoint: string;

  @Output() onResponsiveChange = new Subject<{ width: number; key: string}>();

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.gridReference(width);
    this.onResponsiveChange.next({width: width, key: this.breakpoint});
  }

  constructor(
    @Inject(RESPONSIVE_BREAKPOINTS_TOKEN) private breakpoints: Breakpoints
  ) {}

  ngAfterViewInit() {
    this.onResize(window.innerWidth);
  }

  private gridReference(width: number) {
    if (between(width, 0, this.breakpoints.XS)) {
      this.breakpoint = 'XS';
    }

    if (between(width, 576, this.breakpoints.SM)) {
      this.breakpoint = 'SM';
    }

    if (between(width, 768, this.breakpoints.MD)) {
      this.breakpoint = 'MD';
    }

    if (between(width, 992, this.breakpoints.LG)) {
      this.breakpoint = 'LG';
    }

    if (width >= this.breakpoints.XL) {
      this.breakpoint = 'XL';
    }
  }
}
