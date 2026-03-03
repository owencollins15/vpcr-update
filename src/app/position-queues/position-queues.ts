import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Queues, QUEUES, PositionAssignment, userEntry } from '../app';

@Component({
  selector: 'app-position-queues',
  imports: [FormsModule, CommonModule],
  templateUrl: './position-queues.html',
  styleUrl: './position-queues.scss',
})
export class PositionQueues {
  positionId: number = 0;
  positionName: string = ' ';

  availableQueues: Queues[] = [];
  selectedQueues: Queues[] = [];

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
      this.loadSavedQueue();
    }
  }

  loadSavedQueue() {
    this.availableQueues = [...QUEUES];
    this.selectedQueues = [];

    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      if (data.queueIds && data.queueIds.length > 0) {
        for (let i = 0; i < data.queueIds.length; i++) {
          const queueId = data.queueIds[i];
          const queue = QUEUES.find((q) => q.id === queueId);
          if (queue) {
            this.selectedQueues.push(queue);
            this.availableQueues = this.availableQueues.filter((q) => q.id !== queueId);
          }
        }
      }
    }
  }

  addQueue(queue: Queues) {
    if (!this.selectedQueues.find((q) => q.id === queue.id)) {
      this.selectedQueues = [...this.selectedQueues, queue];
    }
  }

  removeQueue(queue: Queues) {
    this.selectedQueues = this.selectedQueues.filter((q) => q.id !== queue.id); // removes selected items through 'filter' function
  }

  addAllQueues() {
    this.selectedQueues = [...QUEUES];
    console.log('all queues added');
  }

  removeAllQueues() {
    this.selectedQueues = [];
    this.availableQueues = [...QUEUES];
  }

  goBack() {
    //back button
    this.router.navigate(['/position', this.positionId]);
  }

  save(): void {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);

    let divisionId = 0;
    let supervisorId = 0;
    let users: any[] = [];

    if (saved) {
      const existing = JSON.parse(saved);
      divisionId = existing.divisionId || 0;
      supervisorId = existing.supervisorId || 0;
      users = existing.users || [];
    }

    const queueIds: number[] = [];
    for (let i = 0; i < this.selectedQueues.length; i++) {
      queueIds.push(this.selectedQueues[i].id);
    }

    const assignment = {
      divisionId: divisionId,
      supervisorId: supervisorId,
      queueIds: queueIds,
      users: users,
    };

    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(assignment));

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }
}
