import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalModule } from '@segment/carbon/portal';
import { UINotification, UINotificationContainer } from './notification';

@NgModule({
  imports: [CommonModule, PortalModule],
  declarations: [UINotificationContainer],
  exports: [UINotificationContainer],
  entryComponents: [UINotificationContainer],
  providers: [UINotification]
})
export class UINotificationModule {}
