import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommentDialogBoxComponent } from './delete-comment-dialog-box.component';

describe('DeleteCommentDialogBoxComponent', () => {
  let component: DeleteCommentDialogBoxComponent;
  let fixture: ComponentFixture<DeleteCommentDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCommentDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCommentDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
