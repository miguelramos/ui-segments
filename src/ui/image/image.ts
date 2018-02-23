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
  Attribute,
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
  readonly onReady = new Subject<HTMLImageElement>();

  constructor(
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    const img = this.elRef.nativeElement as HTMLImageElement;

    img.onload = () => {
      this.onReady.next(img);
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
  readonly onImageReady = new Subject<HTMLImageElement>();

  @Output()
  readonly onProgress = new Subject<number>();

  images: HTMLImageElement[] = [];

  constructor(
    private _elRef: ElementRef,
    @Attribute('src') private _src: string
  ) {
    if (this._src) {
      this._loadImage(this._src);
    }
  }

  ngAfterContentInit() {
    if (this.imageQuery.length > 0) {
      this.imageQuery.map(image => image.onReady.first()
        .subscribe(img => {
          this.images.push(img);
          this.onImageReady.next(img);
        }));
    }
  }

  private _loadImage(url: string) {
    const xmlHTTP = new XMLHttpRequest();
    const image = document.createElement('img');

    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';

    xmlHTTP.onload = () => {
      const options = {};
      const headers = xmlHTTP.getAllResponseHeaders();
      const mime = headers.match(/^Content-Type\:\s*(.*?)$/mi);

      if (mime && mime[1]) {
        options['type'] = mime[1];
      }

      const blob = new Blob([xmlHTTP.response], options);
      image.src = window.URL.createObjectURL(blob);

      this._elRef.nativeElement.appendChild(image);

      this.images.push(image);
      this.onImageReady.next(image);
    };

    xmlHTTP.onprogress = (e: ProgressEvent) => {
      this.onProgress.next((e.loaded / e.total) * 100);
    };

    xmlHTTP.onloadstart = () => {
      this.onProgress.next(0);
    };

    xmlHTTP.onerror = () => {
      /* tslint:disable */
      const svg = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22843%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20843%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_161c02957fd%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A42pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_161c02957fd%22%3E%3Crect%20width%3D%22843%22%20height%3D%22250%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22314.0703125%22%20y%3D%22144.2%22%3ENO IMAGE%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
      /* tslint:enable */
      image.src = svg;
      this._elRef.nativeElement.appendChild(image);
    };

    xmlHTTP.send();
  }
}
