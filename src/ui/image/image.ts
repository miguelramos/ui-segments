/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */
import {
  Component,
  Directive,
  ElementRef,
  OnInit,
  Output,
  QueryList,
  ContentChildren,
  AfterContentInit
} from '@angular/core';

import 'rxjs/add/operator/first';
import { Subject } from 'rxjs/Subject';

@Directive({
  selector: 'img, [img]'
})
export class UIImg implements OnInit {

  @Output()
  readonly onReady = new Subject<{target: HTMLImageElement}>();

  constructor(
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    const img = this.elRef.nativeElement as HTMLImageElement;

    img.onload = () => {
      this.onReady.next({ target: img });
    };
  }
}

@Component({
  moduleId: module.id,
  selector: 'ui-image, figure[ui-image]',
  templateUrl: 'image.html',
  host: {
    'class': 'image'
  }
})
export class UIImage implements AfterContentInit {
  @ContentChildren(UIImg)
  imageQuery: QueryList<UIImg>;

  @Output()
  onImage = new Subject<HTMLImageElement>();

  images: HTMLImageElement[]  = [];

  ngAfterContentInit() {
    if (this.imageQuery.length > 0) {
      this.imageQuery.map(image => image.onReady.first()
        .subscribe(q => {
          this.images.push(q.target);
          this.onImage.next(q.target);
        }));
    }
  }
}
