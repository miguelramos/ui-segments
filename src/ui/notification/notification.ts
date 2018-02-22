/**
 * @license
 * Copyright UI Segments All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.ui-segments.io/license
 */

import {
  Injector,
  Inject,
  Component,
  Injectable,
  ViewChild,
  ApplicationRef,
  ElementRef,
  ComponentRef,
  EmbeddedViewRef,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import {
  AnimationBuilder, style, animate, stagger, query, transition, animation, useAnimation
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  ComponentType,
  DomPortalOutlet
} from '@segment/carbon/portal';

import { UINotificationConfig } from './notification-config';
import { UIOverlay, UIOverlayRef } from '@segment/carbon/overlay';



@Component({
  moduleId: module.id,
  selector: 'ui-notification-container',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template cdkPortalOutlet></ng-template>`,
  host: {
    'class': 'notification',
    'style': 'display: block;'
  }
})
export class UINotificationContainer extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

  constructor(
    private _elRef: ElementRef
  ) {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal(): EmbeddedViewRef<any> {
    throw Error('Not yet implemented');
  }

  addClasses(...classes: string[]): void {
    (this._elRef.nativeElement as HTMLElement).classList.add(...classes);
  }

  setSize(width: number, heigth: number) {
    (this._elRef.nativeElement as HTMLElement).style.width = `${width}px`;
    (this._elRef.nativeElement as HTMLElement).style.height = `${heigth}px`;
  }
}

@Injectable()
export class UINotification {

  constructor(
    private _overlay: UIOverlay,
    private _injector: Injector,
    private _builder: AnimationBuilder
  ) { }

  openWithComponent<T>(component: ComponentType<T>, config?: UINotificationConfig) {
    // Promise.resolve().then(() => {});
    const _config = _applyConfigDefaults(config);
    this._attach(component, _config);
  }

  private _attachContainer(overlayRef: UIOverlayRef) {
    const container = new ComponentPortal(UINotificationContainer, undefined, this._injector);
    const containerRef: ComponentRef<UINotificationContainer> = overlayRef.attach(container);

    return containerRef.instance;
  }

  private _attach<T>(component: ComponentType<T>, config: UINotificationConfig) {
    const overlayRef = this._createOverlay(config);
    const container = this._attachContainer(overlayRef);
    const portal = new ComponentPortal(component, undefined, this._injector);

    if (config.extraClasses) {
      container.addClasses(...config.extraClasses);
    }

    container.attachComponentPortal(portal);

    this.animate(overlayRef, config);
  }

  private _createOverlay(config: UINotificationConfig): UIOverlayRef {
    return this._overlay.create({
      duration: config.duration as number,
      width: config.width as number,
      height: config.height as number,
      horizontalPosition: config.horizontalPosition,
      verticalPosition: config.verticalPosition
    });
  }

  animate(overlay: UIOverlayRef, config: UINotificationConfig) {
    let effect;

    const leftInOut = animation([
      style({ left: '{{from}}', bottom: '0', position: 'absolute' }),
      animate(200, style({ left: '{{to}}', position: 'relative' }))
    ]);

    const rightInOut = animation([
      style({ right: '{{from}}', bottom: '0', position: 'absolute' }),
      animate(200, style({ right: '{{to}}', position: 'relative' }))
    ]);

    const bottomInOut = animation([
      style({ bottom: '{{from}}', width: `${config.width}`, position: 'absolute' }),
      animate(200, style({ bottom: '{{to}}' }))
    ]);

    const topInOut = animation([
      style({ top: '{{from}}', width: `${config.width}`, position: 'absolute' }),
      animate(200, style({ top: '{{to}}' }))
    ]);

    if (config.horizontalPosition === 'left') {
      effect = leftInOut;
    }

    if (config.horizontalPosition === 'right') {
      effect = rightInOut;
    }

    const animeStart = (this._builder as AnimationBuilder).build([
      useAnimation(effect, {
        params: {
          from: `-${config.width as number + 100}px`,
          to: '0px'
        }
      })
    ]);

    const animeEnd = (this._builder as AnimationBuilder).build([
      useAnimation(effect, {
        params: {
          to: `-${config.width as number + 100}px`,
          from: '0px'
        }
      })
    ]);

    const playerStart = animeStart.create(overlay.overlayElement, { delay: 0 });
    const playerEnd = animeEnd.create(overlay.overlayElement, { delay: 0 });

    /* playerStart.onDone(() => {
      const timeout = setTimeout(() => playerEnd.play(), config.duration);
      playerEnd.onDone(() => clearTimeout(timeout));
    }); */

    playerStart.play();
  }
}

function _applyConfigDefaults(config?: UINotificationConfig): UINotificationConfig {
  return {...new UINotificationConfig(), ...config};
}
