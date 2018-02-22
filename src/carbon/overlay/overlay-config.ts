/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

export type OverlayVerticalPosition = 'top' | 'bottom';
export type OverlayHorizontalPosition = 'left' | 'center' | 'right';

export class UIOverlayConfig {
  duration?: number = 0;

  width?: number|string;
  height?: number|string;
  horizontalPosition?: OverlayHorizontalPosition = 'center';
  verticalPosition?: OverlayVerticalPosition = 'bottom';
}
