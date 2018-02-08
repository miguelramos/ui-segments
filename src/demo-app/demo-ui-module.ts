import { NgModule } from '@angular/core';

import { UINavModule } from '@segment/ui/nav';
import { UIResponsiveModule } from '@segment/ui/core';

@NgModule({
  exports: [
    UIResponsiveModule,
    UINavModule
  ]
})
export class DemoUIModule {}
