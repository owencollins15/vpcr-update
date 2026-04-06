import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  DIVISIONS,
  SUPERVISORS,
  QUEUES,
  PositionAssignment,
  POSITION,
  userEntry,
} from '../position-selection/position-selection';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-overview',
  imports: [CommonModule],
  templateUrl: './user-overview.html',
  styleUrl: './user-overview.scss',
})
export class UserOverview implements OnInit {
  positionId: number = 0;
  userId: number = 0;

  positionName: string = ' ';
  userName: string = ' ';

  responsibilities: string[] = [];
  division: string = ' ';
  supervisor: string = ' ';
  queues: number[] = [];
  users: string[] = [];

  private routeSub?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe to route params - this will trigger whenever navigated to this route
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const posId = params.get('positionId');
      const usrId = params.get('userId');

      if (posId && usrId) {
        this.positionId = +posId; // numeric string -> number using '+'
        this.userId = +usrId; // numeric string -> number using '+'
        this.loadUserData();
        console.log('positionId:', this.positionId, 'userId:', this.userId);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadUserData() {
    //loads saved user data that was stored within local storage
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`); //getItem to parse string
    if (saved) {
      const data = JSON.parse(saved); //string converted to object if data is found
      const user = data.users?.find((u: userEntry) => u.id === this.userId); //find user entry within loaded data with matching userId
      if (user) {
        //if userIds match , find div name correspondent to user divId
        const div = DIVISIONS.find((d) => d.id === user.divisionId);
        this.division = div ? div.name : ' ';
        // if userIds match, find supervisor name and match with user supervisorId
        const sup = SUPERVISORS.find((s) => s.id === user.supervisorId);
        this.supervisor = sup ? sup.name : ' ';
        const queueIds = user.divisionId ? user.queueIds || [] : []; //get list of og queue ids or empty array if none exist
        this.queues = queueIds
          .map((id: number) => {
            //map queue ids to queue name filtering out not found queues
            const q = QUEUES.find((q) => q.id === id);
            return q ? q.name : '';
          })
          .filter((name: string) => name !== ' ');
      }
    }
  }

  goBack() {
    this.router.navigate(['/position', this.positionId]);
  }

  editDivision() {
    this.router.navigate(['/position', this.positionId, 'user', this.userId, 'division']); //edit button for division, routes to divisions page
  }

  editSupervisor() {
    this.router.navigate(['/position', this.positionId, 'user', this.userId, 'supervisor']); //edit button for supervisor, routes to supervisors page
  }

  editQueues() {
    this.router.navigate(['/position', this.positionId, 'user', this.userId, 'queues']); //edit button for queues, routes to queues page
  }

  editResponsibilities() {
    this.router.navigate(['/position', this.positionId, 'user', this.userId, 'responsibilities']); //edit button for responsibilities, routes to responsibilities page
  }
}
