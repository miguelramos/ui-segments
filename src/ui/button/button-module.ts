import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIButton, UIDelete } from './button';

@NgModule({
  imports: [CommonModule],
  declarations: [
    UIButton,
    UIDelete
  ],
  exports: [
    UIButton,
    UIDelete
  ]
})
export class UIButtonModule {}
