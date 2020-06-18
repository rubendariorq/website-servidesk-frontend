import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSoftwareComponent } from './assign-software.component';

describe('AssignSoftwareComponent', () => {
  let component: AssignSoftwareComponent;
  let fixture: ComponentFixture<AssignSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
