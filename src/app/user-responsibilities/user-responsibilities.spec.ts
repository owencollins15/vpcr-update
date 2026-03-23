import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResponsibilities } from './user-responsibilities';

describe('UserResponsibilities', () => {
  let component: UserResponsibilities;
  let fixture: ComponentFixture<UserResponsibilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserResponsibilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserResponsibilities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
