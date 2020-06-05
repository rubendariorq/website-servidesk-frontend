import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLocationHistoryComponent } from './section-location-history.component';

describe('SectionUbicationComponent', () => {
  let component: SectionLocationHistoryComponent;
  let fixture: ComponentFixture<SectionLocationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionLocationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionLocationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
