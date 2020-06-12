import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNetworkConfigurationComponent } from './section-network-configuration.component';

describe('SectionNetworkConfigurationComponent', () => {
  let component: SectionNetworkConfigurationComponent;
  let fixture: ComponentFixture<SectionNetworkConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionNetworkConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNetworkConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
