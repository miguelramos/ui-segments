import {
  Component,
  Directive,
  OnInit,
  Renderer2,
  Input,
  Output,
  ElementRef,
  NgZone
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Directive({
  selector: 'ui-navbar-burger',
  host: {
    'class': 'navbar-burger burger',
    '(click)': '_onClick($event)',
    '[class.is-active]': 'isActive'
  }
})
export class UINavBurger implements OnInit {

  @Input()
  isActive = false;

  @Output()
  readonly onChange = new Subject<{ target: EventTarget; active: boolean}>();

  constructor(
    private render: Renderer2,
    private elRef: ElementRef,
    private zone: NgZone
  ) { }

  _onClick(ev: MouseEvent) {
    ev.preventDefault();

    this.isActive = !this.isActive;

    this.onChange.next({ target: ev.target, active: this.isActive });
  }

  ngOnInit(): void {
    for (let index = 0; index < 3; index++) {
      const span = this.render.createElement('span') as HTMLSpanElement;

      this.zone.runOutsideAngular(() => {
        this.render.appendChild(this.elRef.nativeElement, span);
      });
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'ui-navbar-brand',
  templateUrl: 'brand.html',
  host: {
    'class': 'navbar-brand'
  }
})
export class UINavBrand {}
