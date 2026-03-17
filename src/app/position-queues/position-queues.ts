import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Queues, QUEUES, PositionAssignment, POSITION, Position, userEntry } from '../app';
import { filter } from 'rxjs';

@Component({
  selector: 'app-position-queues',
  imports: [FormsModule, CommonModule],
  templateUrl: './position-queues.html',
  styleUrl: './position-queues.scss',
})
export class PositionQueues {
  positionId: number = 0;
  positionName: string = ' ';

  divisionID: number = 0;

  availableQueues: Queues[] = [];
  selectedQueues: Queues[] = [];

  showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //retrieves id from url route so if /position/5 id = 5
    if (id) {
      this.positionId = Number(id); //if id exists convert string id into a number id
      const pos = POSITION.find((p) => p.id === this.positionId); //search POSITION array for id matching this.position id
      this.positionName = pos?.name || ';'; //this.positionName gets set to the name that matches the found id
      const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
      if (assignData) {
        const data = JSON.parse(assignData); //if found in local storage parse json data
        this.divisionID = data.divisionId || 0; // set new id to id found in stored data or default to 0
      }
      console.log(this.divisionID);
      this.loadSavedQueue();
    }
  }

  loadSavedQueue() {
    this.availableQueues = QUEUES.filter((q) => q.divisionId === this.divisionID); //filter QUEUES to only include queues within current division
    this.selectedQueues = []; //initializes selected queues as empty

    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      if (data.queueIds && data.queueIds.length > 0) {
        for (let i = 0; i < data.queueIds.length; i++) {
          const queueId = data.queueIds[i];
          const queue = QUEUES.find((q) => q.id === queueId); //if data.queueIds exists loop through saved queue ids and find the corresponding queue object and push into selected queues array
          if (queue) {
            this.selectedQueues.push(queue);
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
    this.selectedQueues = this.selectedQueues.filter((q) => q.id !== queue.id); // removes selected items using 'filter' function
  }

  addAllQueues() {
    //adds all queues to selected section
    this.availableQueues = [];
    this.selectedQueues = [...QUEUES.filter((q) => q.divisionId === this.divisionID)];
    console.log('all queues added');
  }

  removeAllQueues() {
    //clear selected items and return back to available
    this.selectedQueues = [];
    this.availableQueues = [...QUEUES.filter((q) => q.divisionId === this.divisionID)];
  }

  goBack() {
    //back button
    this.router.navigate(['/position', this.positionId]);
  }

  save(): void {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    // default state:
    let divisionId = 0;
    let supervisorId = 0;
    let users: any[] = [];

    if (saved) {
      //if saved data exists , parse it into an object and override default state
      const existing = JSON.parse(saved);
      divisionId = existing.divisionId || 0;
      supervisorId = existing.supervisorId || 0;
      users = existing.users || [];
    }

    const queueIds: number[] = [];
    for (let i = 0; i < this.selectedQueues.length; i++) {
      //map to select queue objects to array of queue ids
      queueIds.push(this.selectedQueues[i].id);
    }

    const assignment = {
      //assignment object created to store all data
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
