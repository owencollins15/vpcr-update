import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DIVISIONS,
  SUPERVISORS,
  QUEUES,
  PositionAssignment,
  POSITION,
  userEntry,
  Queues,
} from '../position-selection/position-selection';

@Component({
  selector: 'app-queues-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './queues-component.html',
  styleUrl: './queues-component.scss',
})
export class QueuesComponent implements OnInit {
  positionId: number = 0;
  userId: number = 0;
  displayName?: string = '';
  divisionID: number = 0;
  isUserMode: boolean = false;

  availableQueues: Queues[] = [];
  selectedQueues: Queues[] = [];

  showMessage: boolean = false;

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
      const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
      if (assignData) {
        const data = JSON.parse(assignData);
        const user = data.users?.find((u: any) => u.id === this.userId);
        this.divisionID = user?.divisionId || 0;
      }
    } else if (id) {
      //position mode
      this.isUserMode = false;
      this.positionId = Number(id);
      const pos = POSITION.find((p) => p.id === this.positionId);
      this.displayName = pos?.name || '';
      const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
      if (assignData) {
        const data = JSON.parse(assignData); //if found in local storage parse json data
        this.divisionID = data.divisionId || 0; // set new id to id found in stored data or default to 0
      }
    }
    this.loadSavedQueue();
  }

  loadSavedQueue() {
    if (!this.divisionID) {
      this.availableQueues = [];
      this.selectedQueues = [];
      return;
    }
    this.availableQueues = QUEUES.filter((q) => q.divisionId === this.divisionID); //filter QUEUES to only include queues within current division
    this.selectedQueues = []; //initializes selected queues as empty

    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      if (this.isUserMode) {
        const user = data.users?.find((u: any) => u.id === this.userId);
        if (user) {
          this.displayName = user.name;
          if (user.queueIds && user.queueIds.length > 0) {
            for (let i = 0; i < user.queueIds.length; i++) {
              const queue = QUEUES.find((q) => q.id === user.queueIds![i]);
              if (queue) {
                this.selectedQueues.push(queue);
              }
            }
            this.availableQueues = this.availableQueues.filter(
              (q) => !this.selectedQueues.find((sq) => sq.id === q.id),
            );
          }
        }
      } else {
        if (data.queueIds && data.queueIds.length > 0) {
          for (let i = 0; i < data.queueIds.length; i++) {
            const queueId = data.queueIds[i];
            const queue = QUEUES.find((q) => q.id === queueId); //if data.queueIds exists loop through saved queue ids and find the corresponding queue object and push into selected queues array
            if (queue) {
              this.selectedQueues.push(queue);
            }
          }
        }
        this.availableQueues = this.availableQueues.filter(
          (q) => !this.selectedQueues.find((sq) => sq.id === q.id),
        );
      }
    }
  }

  addQueue(queue: Queues) {
    this.availableQueues = this.availableQueues.filter((q) => q.id !== queue.id); //adds all queues to selected section
    if (!this.selectedQueues.find((q) => q.id === queue.id)) {
      this.selectedQueues = [...this.selectedQueues, queue];
    }
  }

  removeQueue(queue: Queues) {
    this.selectedQueues = this.selectedQueues.filter((q) => q.id !== queue.id); // removes selected items using 'filter' function
  }

  addAllQueues() {
    this.availableQueues = []; //moves all available to selected
    this.selectedQueues = [...QUEUES.filter((q) => q.divisionId === this.divisionID)];
  }

  removeAllQueues() {
    this.selectedQueues = []; //moves all selected back to available
    this.availableQueues = [...QUEUES.filter((q) => q.divisionId === this.divisionID)];
  }

  goBack() {
    if (this.isUserMode) {
      //navigate back to user overview
      this.router.navigate(['/user', this.userId]);
    } else {
      this.router.navigate(['/position', this.positionId]);
    }
  }
  saveQueues() {
    const key = `position_assignment_${this.positionId}`;
    const saved = localStorage.getItem(key);

    //initialize existing structure
    let existing: PositionAssignment = saved
      ? JSON.parse(saved)
      : {
          divisionId: 0,
          supervisorId: 0,
          queueIds: [],
          users: [],
        };

    // ensure arrays exist to avoid .find() on undefined
    existing.users = existing.users || [];

    if (this.isUserMode) {
      //  find user
      const user = existing.users.find((u: any) => u.id === this.userId);
      if (user) {
        // map objects to ids
        user.queueIds = this.selectedQueues.map((q: any) => q.id);
      } else {
        //case where user doesn't exist in existing.users
        existing.users.push({
          id: this.userId,
          queueIds: this.selectedQueues.map((q: any) => q.id),
        });
      }
    } else {
      existing.queueIds = this.selectedQueues.map((q: any) => q.id);
    }

    localStorage.setItem(key, JSON.stringify(existing));

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }
}
