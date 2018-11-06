import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapfreerunPage } from './mapfreerun.page';

describe('MapfreerunPage', () => {
  let component: MapfreerunPage;
  let fixture: ComponentFixture<MapfreerunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfreerunPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapfreerunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
