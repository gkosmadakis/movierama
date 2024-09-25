import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoginDialogComponent } from './add-login-dialog.component';

describe('AddLoginDialogComponent', () => {
  let component: AddLoginDialogComponent;
  let fixture: ComponentFixture<AddLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLoginDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
