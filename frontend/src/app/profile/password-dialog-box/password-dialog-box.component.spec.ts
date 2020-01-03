import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordDialogBoxComponent } from './password-dialog-box.component';

describe('PasswordDialogBoxComponent', () => {
  let component: PasswordDialogBoxComponent;
  let fixture: ComponentFixture<PasswordDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
