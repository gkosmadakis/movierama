import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignUpDialogComponent } from './add-sign-up-dialog.component';

describe('AddSignUpDialogComponent', () => {
  let component: AddSignUpDialogComponent;
  let fixture: ComponentFixture<AddSignUpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSignUpDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSignUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
