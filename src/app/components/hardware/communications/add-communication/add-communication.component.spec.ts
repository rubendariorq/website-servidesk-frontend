import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommunicationComponent } from './add-communication.component';

describe('AddCommunicationComponent', () => {
  let component: AddCommunicationComponent;
  let fixture: ComponentFixture<AddCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
