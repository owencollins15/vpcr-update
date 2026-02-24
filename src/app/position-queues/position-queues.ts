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

  queue: Queues[] = QUEUES; //holds array of queues just like divisions did
  selQueue: Queues[] = []; //0 indicates no queue selected
  showQueuesDropdown: boolean = false; //false until select dropdown is clicked

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
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      if (data.queueIds && data.queueIds.length > 0) {
        this.selQueue = [];
        for (let i = 0; i < data.queueIds.length; i++) {
          const queue = QUEUES.find((q) => q.id === data.queueIds[i]);
          if (queue) {
            this.selQueue.push(queue);
          }
        }
      }
    }
  }

  toggleQueueDrop() {
    this.showQueuesDropdown = !this.showQueuesDropdown; //toggles queue dropdown on click
    console.log('dropdown opened');
  }

  isQueueSel(queueId: number) {
    return this.selQueue.some((q) => q.id === queueId); //when checkbox is clicked for queues within dropdown ,  that queue id is selected and then saved if save is pressed
  }

  toggleQueue(queue: Queues) {
    const index = this.selQueue.findIndex((q) => q.id === queue.id);
    if (index > -1) {
      const newQueue: Queues[] = [];
      for (let i = 0; i < this.selQueue.length; i++) {
        if (this.selQueue[i].id !== queue.id) {
          newQueue.push(this.selQueue[i]);
        }
      }
      this.selQueue = newQueue;
    } else {
      this.selQueue = [...this.selQueue, queue];
    }
  }

  removeQueue(queue: Queues) {
    this.selQueue = this.selQueue.filter((q) => q.id !== queue.id); // removes selected items through 'filter' function
    console.log('queue removed');
  }

  addAllQueues() {
    this.selQueue = [...QUEUES]; // adds every single queue
    console.log('all queues added');
  }

  removeAllQueues() {
    this.selQueue = []; // removes all queues selected
    console.log('all queues removed');
  }

  goBack() {
    //back button
    this.router.navigate(['/position', this.positionId]);
  }

  saveQueues() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    const existing = saved ? JSON.parse(saved) : {};

    const queueIds: number[] = [];
    for (let i = 0; i < this.selQueue.length; i++) {
      queueIds.push(this.selQueue[i].id);
    }
    const assignment = {
      divisionId: existing.divisionId || 0,
      supervisorId: existing.supervisorId || 0,
      queueIds: queueIds,
      users: existing.users || [],
    };

    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(assignment));
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }
}
