import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesAddComponent } from './dependencies-add.component';

describe('DependenciesAddComponent', () => {
  let component: DependenciesAddComponent;
  let fixture: ComponentFixture<DependenciesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenciesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
