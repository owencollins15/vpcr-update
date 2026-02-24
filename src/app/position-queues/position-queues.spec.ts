import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionQueues } from './position-queues';

describe('PositionQueues', () => {
  let component: PositionQueues;
  let fixture: ComponentFixture<PositionQueues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionQueues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionQueues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
