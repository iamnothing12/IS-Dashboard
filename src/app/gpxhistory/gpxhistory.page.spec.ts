import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpxhistoryPage } from './gpxhistory.page';

describe('GpxhistoryPage', () => {
  let component: GpxhistoryPage;
  let fixture: ComponentFixture<GpxhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpxhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpxhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
