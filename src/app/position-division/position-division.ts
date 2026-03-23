import { Component, OnInit } from '@angular/core';
import { DIVISIONS, Division, PositionAssignment } from '../app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-position-division',
  imports: [CommonModule, FormsModule],
  templateUrl: './position-division.html',
  styleUrl: './position-division.scss',
})
export class PositionDivision implements OnInit {
  positionId: number = 0;
  positionName: string = ' ';

  division: Division[] = DIVISIONS; //holds array of division objects imported from app.ts , this is what populates the drop down list
  selDivisionId: number = 0; //0 indicates no division has been selected

  showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.positionId = Number(id);
      this.positionName = `position${id}`;
      this.loadSavedDivision();
    }
  }

  loadSavedDivision() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`); // checks local storage for any users and their division assignment saved to that position
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      this.selDivisionId = data.divisionId || 0;
    }
  }

  onDivisionChange(event: any) {
    //take value from event target , convert it into a number and store in selDivisionId
    this.selDivisionId = Number(event.target.value);
    console.log('Division changed to:', this.selDivisionId);
  }

  saveDiv() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    const existing: PositionAssignment = saved
      ? JSON.parse(saved) // parse existing data or initialize a default structure if none exists
      : {
          divisionId: 0,
          supervisorId: 0,
          queueIds: [],
          users: [],
        };
    //update divisionId with selected divisionId
    const assignment: PositionAssignment = {
      divisionId: this.selDivisionId, // updated divId
      supervisorId: existing.supervisorId || 0,
      queueIds: existing.queueIds || [],
      users: existing.users || [],
    };

    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(assignment)); //use setItem to parse a value into an object

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }

  goBack() {
    //back button
    this.router.navigate(['/position', this.positionId]);
  }
}
