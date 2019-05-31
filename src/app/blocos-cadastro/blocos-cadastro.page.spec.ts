import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocosCadastroPage } from './blocos-cadastro.page';

describe('BlocosCadastroPage', () => {
  let component: BlocosCadastroPage;
  let fixture: ComponentFixture<BlocosCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocosCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocosCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
