import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoftwareComponent } from './list-software.component';

describe('ListSoftwareComponent', () => {
  let component: ListSoftwareComponent;
  let fixture: ComponentFixture<ListSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
