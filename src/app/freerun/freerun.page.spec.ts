import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreerunPage } from './freerun.page';

describe('FreerunPage', () => {
  let component: FreerunPage;
  let fixture: ComponentFixture<FreerunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreerunPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreerunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
