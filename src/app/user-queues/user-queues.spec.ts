import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQueues } from './user-queues';

describe('UserQueues', () => {
  let component: UserQueues;
  let fixture: ComponentFixture<UserQueues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserQueues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserQueues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
