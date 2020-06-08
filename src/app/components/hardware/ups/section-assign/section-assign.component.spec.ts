import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAssignComponent } from './section-assign.component';

describe('SectionAssignComponent', () => {
  let component: SectionAssignComponent;
  let fixture: ComponentFixture<SectionAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
