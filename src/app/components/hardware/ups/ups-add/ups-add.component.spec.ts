import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsAddComponent } from './ups-add.component';

describe('UpsAddComponent', () => {
  let component: UpsAddComponent;
  let fixture: ComponentFixture<UpsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
