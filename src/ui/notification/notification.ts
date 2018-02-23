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
  style,
  animate,
  animation,
  useAnimation,
  AnimationPlayer,
  AnimationBuilder
} from '@angular/animations';

import { Subject } from 'rxjs/Subject';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  ComponentType,
  DomPortalOutlet
} from '@segment/carbon/portal';

import { UINotificationContainer } from './notification-container';
import { UINotificationConfig } from './notification-config';
import { UIOverlay, UIOverlayRef } from '@segment/carbon/overlay';

@Injectable()
export class UINotification {

  readonly animationStartDone = new Subject();
  readonly animationEndDone = new Subject();

  private _openedRef: ComponentRef<UINotificationContainer>;

  constructor(
    private _overlay: UIOverlay,
    private _injector: Injector,
    private _builder: AnimationBuilder
  ) { }

  openWithComponent<T>(
    component: ComponentType<T>,
    config?: UINotificationConfig
  ): ComponentRef<T> {
    // Promise.resolve().then(() => {});
    const _config = _applyConfigDefaults(config);

    this.animationEndDone.first().subscribe(() => this._openedRef.destroy());

    return this._attach(component, _config);
  }

  private _attachContainer(overlayRef: UIOverlayRef) {
    const container = new ComponentPortal(UINotificationContainer, undefined, this._injector);
    const containerRef: ComponentRef<UINotificationContainer> = overlayRef.attach(container);

    this._openedRef = containerRef;

    return containerRef.instance;
  }

  private _attach<T>(component: ComponentType<T>, config: UINotificationConfig) {
    const overlayRef = this._createOverlay(config);
    const container = this._attachContainer(overlayRef);
    const portal = new ComponentPortal(component, undefined, this._injector);

    const componentRef = container.attachComponentPortal(portal);
    componentRef.instance['data'] = config.data;

    const players = this.createAnimation(overlayRef, config);

    if (config.extraClasses) {
      container.addClasses(...config.extraClasses);
    }

    if (config.close) {
      container.onDispose.first().subscribe(() => players[1].play());
    }

    return componentRef;
  }

  private _createOverlay(config: UINotificationConfig): UIOverlayRef {
    console.dir(config);

    return this._overlay.create({
      duration: config.duration as number,
      width: config.width as number,
      height: config.height as number,
      horizontalPosition: config.horizontalPosition,
      verticalPosition: config.verticalPosition,
      // close: config.close,
      // full: config.full
    });
  }

  createAnimation(overlay: UIOverlayRef, config: UINotificationConfig): AnimationPlayer[] {
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
      style({ bottom: '{{from}}', width: `${config.width}px`, position: 'absolute' }),
      animate(200, style({ bottom: '{{to}}', position: 'relative' }))
    ]);

    const topInOut = animation([
      style({ top: '{{from}}', width: `${config.width}px`, position: 'absolute' }),
      animate(200, style({ top: '{{to}}', position: 'relative' }))
    ]);

    if (config.horizontalPosition === 'left') {
      effect = leftInOut;
    }

    if (config.horizontalPosition === 'right') {
      effect = rightInOut;
    }

    if (config.horizontalPosition === 'center') {
      effect = config.verticalPosition === 'top' ? topInOut : bottomInOut;
    }

    const size = config.horizontalPosition === 'center' ? config.height : config.width;

    const animeStart = (this._builder as AnimationBuilder).build([
      useAnimation(effect, {
        params: {
          from: `-${size as number + 100}px`,
          to: '0px'
        }
      })
    ]);

    const animeEnd = (this._builder as AnimationBuilder).build([
      useAnimation(effect, {
        params: {
          to: `-${size as number + 100}px`,
          from: '0px'
        }
      })
    ]);

    const playerStart = animeStart.create(overlay.overlayElement, { delay: 0 });
    const playerEnd = animeEnd.create(overlay.overlayElement, { delay: 0 });

    playerStart.onDone(() => {
      this.animationStartDone.next(this);

      if (config.duration as number > 0) {
        const timeout = setTimeout(() => {
          playerEnd.play();
          clearTimeout(timeout);
        }, config.duration);
      }
    });

    playerEnd.onDone(() => {
      overlay.dispose();

      this.animationEndDone.next(this);
    });

    playerStart.play();

    return [playerStart, playerEnd];
  }
}

function _applyConfigDefaults(config?: UINotificationConfig): UINotificationConfig {
  return {...new UINotificationConfig(), ...config};
}
