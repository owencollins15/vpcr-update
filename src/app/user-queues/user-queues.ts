import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Queues, QUEUES, PositionAssignment } from '../app';

@Component({
  selector: 'app-user-queues',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-queues.html',
  styleUrl: './user-queues.scss',
})
export class UserQueues implements OnInit {
  positionId: number = 0;
  userId: number = 0;
  userName: string = '';
  divisionID: number = 0;

  availableQueues: Queues[] = [];
  selectedQueues: Queues[] = [];

  showMessage: boolean = false;

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
      const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
      if (assignData) {
        const data = JSON.parse(assignData);
        const user = data.users?.find((u: any) => u.id === this.userId);
        this.divisionID = user?.divisionId || 0;
      }
      this.loadSavedQueue();
    }
  }

  loadSavedQueue() {
    this.availableQueues = QUEUES.filter((q) => q.divisionId === this.divisionID);
    this.selectedQueues = [];

    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data = JSON.parse(saved);
      const user = data.users?.find((u: any) => u.id === this.userId);
      if (user) {
        this.userName = user.name;
        if (user.queueIds && user.queueIds.length > 0) {
          for (let i = 0; i < user.queueIds.length; i++) {
            const queue = QUEUES.find((q) => q.id === user.queueIds![i]);
            if (queue) {
              this.selectedQueues.push(queue);
            }
          }
        }
      }
    }
  }

  addQueue(queue: Queues) {
    this.availableQueues = this.availableQueues.filter((q) => q.id !== queue.id);
    if (!this.selectedQueues.find((q) => q.id === queue.id)) {
      this.selectedQueues = [...this.selectedQueues, queue];
    }
  }

  removeQueue(queue: Queues) {
    this.selectedQueues = this.selectedQueues.filter((q) => q.id !== queue.id);
  }

  addAllQueues() {
    this.availableQueues = [];
    this.selectedQueues = [...QUEUES.filter((q) => q.divisionId === this.divisionID)];
  }

  removeAllQueues() {
    this.selectedQueues = [];
    this.availableQueues = [...QUEUES.filter((q) => q.divisionId === this.divisionID)];
  }

  goBack() {
    if (!this.positionId || !this.userId) {
      console.error('Missing route params', this.positionId, this.userId);
      return;
    }
    this.router.navigate(['/position', this.positionId, 'user', this.userId]);
  }

  save(): void {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    const existing = saved
      ? JSON.parse(saved)
      : { divisionId: 0, supervisorId: 0, queueIds: [], users: [] };
    const user = existing.users?.find((u: any) => u.id === this.userId);
    if (user) {
      user.queueIds = this.selectedQueues.map((q) => q.id);
    }
    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(existing));
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }
}
