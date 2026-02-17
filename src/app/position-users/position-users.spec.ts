import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionUsers } from './position-users';

describe('PositionUsers', () => {
  let component: PositionUsers;
  let fixture: ComponentFixture<PositionUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
