import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSelection } from './position-selection';

describe('PositionSelection', () => {
  let component: PositionSelection;
  let fixture: ComponentFixture<PositionSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
