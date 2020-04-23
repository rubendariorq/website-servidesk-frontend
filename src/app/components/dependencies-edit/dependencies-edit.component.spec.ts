import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesEditComponent } from './dependencies-edit.component';

describe('DependenciesEditComponent', () => {
  let component: DependenciesEditComponent;
  let fixture: ComponentFixture<DependenciesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenciesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
