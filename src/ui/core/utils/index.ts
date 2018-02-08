import { NgModule } from '@angular/core';

import { UIResponsiveBreakpoints, RESPONSIVE_BREAKPOINTS_TOKEN, DEFAULT_RESPONSIVE_BREAKPOINTS_TOKEN } from './responsive';

@NgModule({
  providers: [
    { provide: RESPONSIVE_BREAKPOINTS_TOKEN, useValue: DEFAULT_RESPONSIVE_BREAKPOINTS_TOKEN },
    { provide: UIResponsiveBreakpoints, useClass: UIResponsiveBreakpoints, deps: [RESPONSIVE_BREAKPOINTS_TOKEN]}
  ],
  declarations: [UIResponsiveBreakpoints],
  exports: [UIResponsiveBreakpoints]
})
export class UIResponsiveModule { }

export * from './responsive';
