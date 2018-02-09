import {By} from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UINavModule, UINavItem, UINavLink } from './index';

describe('> Navigation Item Bar', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UINavModule],
      declarations: [TestUINavItem]
    });

    TestBed.compileComponents();
  }));

  it('# Should check UINavbarItem active, dropdown classes and click trigger observable.', () => {
    let fixture = TestBed.createComponent(TestUINavItem);

    let testComponent = fixture.debugElement.componentInstance as TestUINavItem;
    let divDebugElement = fixture.debugElement.query(By.css('div[ui-navbar-item]'));

    expect(divDebugElement.nativeElement.classList.contains('navbar-item')).toBe(true);
    expect(testComponent.isActive).toBe(false);

    testComponent.isActive = true;
    fixture.detectChanges();

    expect(divDebugElement.nativeElement.classList.contains('is-active')).toBe(true);

    testComponent.hasDropdown = true;
    fixture.detectChanges();

    expect(divDebugElement.nativeElement.classList.contains('has-dropdown')).toBe(true);

    testComponent.hasDropdown = false;
    testComponent.hasDropdownUp = true;
    fixture.detectChanges();

    expect(divDebugElement.nativeElement.classList.contains('has-dropdown-up')).toBe(true);

    divDebugElement.nativeElement.click();

    expect(testComponent.clickItemCount).toBe(1);
    expect(testComponent.eventItemHandler).not.toBe(undefined);
  });

  it('# Should check NavBarLink presence, click and textContent.', () => {
    let fixture = TestBed.createComponent(TestUINavItem);

    let testComponent = fixture.debugElement.componentInstance as TestUINavItem;
    let linkDebugElement = fixture.debugElement.query(By.directive(UINavLink));

    expect((<HTMLAnchorElement>linkDebugElement.nativeElement).textContent).toEqual('NavBarLink');

    (<HTMLAnchorElement>linkDebugElement.nativeElement).click();

    expect(testComponent.clickLinkCount).toBe(1);
    expect(testComponent.eventLinkHandler).not.toBe(undefined);
  });

  it('# Should check UINavDropDown active/deactive.', () => {
    let fixture = TestBed.createComponent(TestUINavItem);

    let testComponent = fixture.debugElement.componentInstance as TestUINavItem;
    let divDebugElement = fixture.debugElement.query(By.css('div[ui-navbar-dropdown]'));

    testComponent.hasDropdown = false;
    testComponent.hasDropdownUp = false;
    testComponent.isActive = false;
    fixture.detectChanges();

    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    const style = window.getComputedStyle(divDebugElement.nativeElement);
    const display = width >= 1024 ? 'none' : 'block';

    expect(style.display).toEqual(display);
  });
});

@Component({
  selector: 'test-ui-nav-item',
  template: `
    <div ui-navbar-item
      [hasDropdown]="hasDropdown"
      [hasDropdownUp]="hasDropdownUp"
      [isActive]="isActive"
      (onClick)="handlerNavbarItemClick($event)">
      <a ui-navbar-link (onClick)="handlerNavbarLinkClick($event)">NavBarLink</a>
      <div ui-navbar-dropdown [isRight]="isRight">
        <a ui-navbar-item>DropDown Item</a>
      </div>
    </div>
  `
})
class TestUINavItem {
  hasDropdown = false;
  hasDropdownUp = false;
  isActive = false;
  isRight = false;
  clickItemCount = 0;
  clickLinkCount = 0;

  eventItemHandler;
  eventLinkHandler;

  handlerNavbarItemClick(ev: { target: EventTarget; source: UINavItem }) {
    this.clickItemCount++;
    this.eventItemHandler = ev;
  }

  handlerNavbarLinkClick(ev: MouseEvent) {
    this.clickLinkCount++;
    this.eventLinkHandler = ev;
  }
}
