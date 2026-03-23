import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSupervisor } from './user-supervisor';

describe('UserSupervisor', () => {
  let component: UserSupervisor;
  let fixture: ComponentFixture<UserSupervisor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSupervisor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSupervisor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
