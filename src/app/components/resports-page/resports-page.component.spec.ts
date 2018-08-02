import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResportsPageComponent } from './resports-page.component';

describe('ResportsPageComponent', () => {
  let component: ResportsPageComponent;
  let fixture: ComponentFixture<ResportsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResportsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
