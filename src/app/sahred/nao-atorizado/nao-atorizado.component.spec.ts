import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoAtorizadoComponent } from './nao-atorizado.component';

describe('NaoAtorizadoComponent', () => {
  let component: NaoAtorizadoComponent;
  let fixture: ComponentFixture<NaoAtorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaoAtorizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaoAtorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
