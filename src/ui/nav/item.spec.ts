import {By} from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UINavModule, UINavItem } from './index';

describe('> Navigation Bar', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UINavModule],
      declarations: [TestUINavItem]
    });

    TestBed.compileComponents();
  }));

  it('# Should...', () => {
    let fixture = TestBed.createComponent(TestUINavItem);

    let testComponent = fixture.debugElement.componentInstance;
    let aDebugElement = fixture.debugElement.query(By.css('a'));

    expect(aDebugElement.nativeElement.classList.contains('navbar-item')).toBe(true);
  });
});

@Component({
  selector: 'test-ui-nav-item',
  template: `<a ui-navbar-item>My Item</a>`
})
class TestUINavItem { }
