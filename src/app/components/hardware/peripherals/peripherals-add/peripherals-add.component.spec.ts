import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralsAddComponent } from './peripherals-add.component';

describe('PeripheralsAddComponent', () => {
  let component: PeripheralsAddComponent;
  let fixture: ComponentFixture<PeripheralsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeripheralsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
