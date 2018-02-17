/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segment.io/license
 */
import { NgModule } from '@angular/core';

import { UIOverlay } from './overlay';
import { UIOVERLAY_CONTAINER_PROVIDER } from './overlay-container';

@NgModule({
  providers: [UIOVERLAY_CONTAINER_PROVIDER, UIOverlay]
})
export class UIOverlayModule { }
