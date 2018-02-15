/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */
import { NgModule } from '@angular/core';

import { UINavModule } from '@segment/ui/nav';
import { UIButtonModule } from '@segment/ui/button';
import { UIImageModule } from '@segment/ui/image';
import { UINotificationModule } from '@segment/ui/notification';
import { UIResponsiveModule } from '@segment/ui/core';

@NgModule({
  exports: [
    UIResponsiveModule,
    UINavModule,
    UIButtonModule,
    UIImageModule,
    UINotificationModule
  ]
})
export class DemoUIModule {}
