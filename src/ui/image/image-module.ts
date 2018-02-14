import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIImage, UIImg } from './image';

@NgModule({
  imports: [CommonModule],
  declarations: [
    UIImage,
    UIImg
  ],
  exports: [
    UIImage,
    UIImg
  ]
})
export class UIImageModule {}
