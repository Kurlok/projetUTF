import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocosPage } from './blocos.page';

describe('BlocosPage', () => {
  let component: BlocosPage;
  let fixture: ComponentFixture<BlocosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
