import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDivision } from './position-division';

describe('PositionDivision', () => {
  let component: PositionDivision;
  let fixture: ComponentFixture<PositionDivision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionDivision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionDivision);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
