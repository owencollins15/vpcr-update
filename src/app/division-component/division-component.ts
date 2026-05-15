import { Component, OnInit } from '@angular/core';
import { PositionAssignment, getPositionList } from '../position-selection/position-selection';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface Division {
  id: number;
  name: string;
}

export function getDiv() {
  return [
    { id: 1, name: 'SOA' },
    { id: 2, name: 'SDMC' },
    { id: 3, name: 'Intake' },
    { id: 4, name: '3BDR' },
    { id: 5, name: 'SOAR' },
    { id: 6, name: 'Field' },
    { id: 7, name: 'Death' },
    { id: 8, name: 'OGC(LDU)' },
    { id: 9, name: 'Employee Discipline' },
    { id: 10, name: 'DeNovo' },
    { id: 11, name: 'ALU' },
    { id: 12, name: 'Prosecutions' },
    { id: 13, name: 'AHU' },
    { id: 14, name: 'OSP' },
    { id: 15, name: 'CBC' },
    { id: 16, name: 'IFSU' },
    { id: 17, name: 'Forensics' },
    { id: 18, name: 'PQI' },
    { id: 19, name: 'Records Access' },
  ];
}

@Component({
  selector: 'app-division-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './division-component.html',
  styleUrl: './division-component.scss',
})
export class DivisionComponent implements OnInit {
  positionId: number = 0;
  userId: number = 0;
  isUserMode: boolean = false;

  selDivisionId: number = 0;
  showMessage: boolean = false;
  divisions: Division[] = getPositionList();
  displayName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const positionId = this.route.snapshot.paramMap.get('positionId');
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId && positionId) {
      //user mode
      this.isUserMode = true;
      this.positionId = Number(positionId);
      this.userId = Number(userId);
    } else if (id) {
      //position mode
      this.isUserMode = false;
      this.positionId = Number(id);
      const pos = getPositionList().find((p) => p.id === this.positionId);
      this.displayName = pos?.name || '';
    }
    this.loadSavedDivision();
  }
  loadSavedDivision() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      if (this.isUserMode) {
        const user = data.users?.find((u: any) => u.id === this.userId);
        if (user) {
          this.displayName = user.name || '';
          this.selDivisionId = user.divisionId || 0;
        }
      } else {
        this.selDivisionId = data.divisionId || 0;
      }
    }
  }
  onDivisionChange(event: any) {
    //take value from event target , convert it into a number and store in selDivisionId
    this.selDivisionId = Number(event.target.value);
    console.log('Division changed to:', this.selDivisionId);
  }
  saveDiv() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`); //use geItem to parse string into object
    const existing: PositionAssignment = saved
      ? JSON.parse(saved) // parse existing data or initialize a default structure if none exists
      : {
          divisionId: 0,
          supervisorId: 0,
          queueIds: [],
          users: [],
        };
    if (this.isUserMode) {
      const user = existing.users?.find((u: any) => u.id === this.userId);
      if (user) {
        user.divisionId = this.selDivisionId;
      }
    } else {
      existing.divisionId = this.selDivisionId;
      existing.supervisorId = existing.supervisorId || 0;
      existing.queueIds = existing.queueIds || [];
      existing.users = existing.users || [];
    }
    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(existing));
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }

  goBack() {
    if (this.isUserMode) {
      this.router.navigate(['/user', this.userId]);
    } else {
      this.router.navigate(['/position', this.positionId]);
    }
  }
}
