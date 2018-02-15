/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

export type NotificationVerticalPosition = 'top' | 'bottom';
export type NotificationHorizontalPosition = 'left' | 'center' | 'right';

export class UINotificationConfig {
  duration?: number = 0;

  horizontalPosition?: NotificationHorizontalPosition = 'center';
  verticalPosition?: NotificationVerticalPosition = 'bottom';
}