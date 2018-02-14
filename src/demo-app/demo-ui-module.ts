import { NgModule } from '@angular/core';

import { UINavModule } from '@segment/ui/nav';
import { UIButtonModule } from '@segment/ui/button';
import { UIResponsiveModule } from '@segment/ui/core';

@NgModule({
  exports: [
    UIResponsiveModule,
    UINavModule,
    UIButtonModule
  ]
})
export class DemoUIModule {}
