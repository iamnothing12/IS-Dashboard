import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostrunPage } from './ghostrun.page';

describe('GhostrunPage', () => {
  let component: GhostrunPage;
  let fixture: ComponentFixture<GhostrunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostrunPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostrunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
