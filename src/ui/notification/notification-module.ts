import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UINotification } from './notification';
import { PortalModule } from '@segment/carbon/portal';
import { UIOverlayModule } from '@segment/carbon/overlay';
import { UINotificationContainer } from './notification-container';

@NgModule({
  imports: [CommonModule, PortalModule, UIOverlayModule],
  declarations: [UINotificationContainer],
  exports: [UINotificationContainer],
  entryComponents: [UINotificationContainer],
  providers: [UINotification]
})
export class UINotificationModule {}
