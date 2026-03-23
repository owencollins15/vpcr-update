import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDivision } from './user-division';

describe('UserDivision', () => {
  let component: UserDivision;
  let fixture: ComponentFixture<UserDivision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDivision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDivision);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
