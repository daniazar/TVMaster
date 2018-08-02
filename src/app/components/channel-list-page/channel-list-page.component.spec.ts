import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListPageComponent } from './channel-list-page.component';

describe('ChannelListPageComponent', () => {
  let component: ChannelListPageComponent;
  let fixture: ComponentFixture<ChannelListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
