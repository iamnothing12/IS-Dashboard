import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionpagePage } from './selectionpage.page';

describe('SelectionpagePage', () => {
  let component: SelectionpagePage;
  let fixture: ComponentFixture<SelectionpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
