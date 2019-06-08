import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosModalComponent } from './cursos-modal.component';

describe('CursosModalComponent', () => {
  let component: CursosModalComponent;
  let fixture: ComponentFixture<CursosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
