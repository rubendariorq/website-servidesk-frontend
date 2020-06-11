import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionConnectedPrintersComponent } from './section-connected-printers.component';

describe('SectionConnectedPrintersComponent', () => {
  let component: SectionConnectedPrintersComponent;
  let fixture: ComponentFixture<SectionConnectedPrintersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionConnectedPrintersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionConnectedPrintersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
