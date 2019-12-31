import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPostsComponent } from './view-all-posts.component';

describe('ViewAllPostsComponent', () => {
  let component: ViewAllPostsComponent;
  let fixture: ComponentFixture<ViewAllPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
