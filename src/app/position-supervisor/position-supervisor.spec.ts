import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSupervisor } from './position-supervisor';

describe('PositionSupervisor', () => {
  let component: PositionSupervisor;
  let fixture: ComponentFixture<PositionSupervisor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionSupervisor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionSupervisor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
