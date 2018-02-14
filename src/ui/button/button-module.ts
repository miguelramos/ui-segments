import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIButton } from './button';

@NgModule({
  imports: [CommonModule],
  declarations: [
    UIButton
  ],
  exports: [
    UIButton
  ]
})
export class UIButtonModule {}
