import { Component, OnInit } from '@angular/core';
import { DIVISIONS, Division, PositionAssignment } from '../app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-division',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-division.html',
  styleUrl: './user-division.scss',
})
export class UserDivision implements OnInit {
  positionId: number = 0;
  userId: number = 0;
  selDivisionId: number = 0;
  showMessage: boolean = false;
  divisions = DIVISIONS;
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const positionId = this.route.snapshot.paramMap.get('positionId');
    const userId = this.route.snapshot.paramMap.get('userId');
    if (positionId && userId) {
      this.positionId = Number(positionId);
      this.userId = Number(userId);
      this.loadSavedDivision();
    }
  }

  loadSavedDivision() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`); // checks local storage for any users and their division assignment saved to that position
    if (saved) {
      const data = JSON.parse(saved);
      const user = data.users?.find((u: any) => u.id === this.userId);
      if (user) {
        this.userName = user.name;
        this.selDivisionId = user.divisionId || 0;
      }
    }
  }

  onDivisionChange(event: any) {
    //take value from event target , convert it into a number and store in selDivisionId
    this.selDivisionId = Number(event.target.value);
  }

  saveDiv() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`); //use geItem to parse string into object
    const existing: PositionAssignment = saved
      ? JSON.parse(saved)
      : { divisionId: 0, supervisorId: 0, queueIds: [], users: [] };
    const user = existing.users?.find((u: any) => u.id === this.userId);
    if (user) {
      user.divisionId = this.selDivisionId;
    }
    console.log('saving - positionId:', this.positionId, 'userId:', this.userId);
    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(existing)); //use setItem to parse value into object
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBackToUser();
    }, 1500);
  }

  goBackToUser() {
    if (!this.positionId || !this.userId) {
      console.error('Missing route params', this.positionId, this.userId);
      return;
    }
    this.router.navigate(['/position', this.positionId, 'user', this.userId]);
  }
}
