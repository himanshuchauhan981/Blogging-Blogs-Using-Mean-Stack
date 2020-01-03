import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDialogBoxComponent } from './profile-dialog-box.component';

describe('ProfileDialogBoxComponent', () => {
  let component: ProfileDialogBoxComponent;
  let fixture: ComponentFixture<ProfileDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
