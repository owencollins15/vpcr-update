import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionOverview } from './position-overview';

describe('PositionOverview', () => {
  let component: PositionOverview;
  let fixture: ComponentFixture<PositionOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
