import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAssignPeripheralComponent } from './section-assign-peripheral.component';

describe('SectionAssignPeripheralComponent', () => {
  let component: SectionAssignPeripheralComponent;
  let fixture: ComponentFixture<SectionAssignPeripheralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAssignPeripheralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAssignPeripheralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
