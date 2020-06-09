import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAssignComputerComponent } from './section-assign-computer.component';

describe('SectionAssignComputerComponent', () => {
  let component: SectionAssignComputerComponent;
  let fixture: ComponentFixture<SectionAssignComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionAssignComputerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAssignComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
