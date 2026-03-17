import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DIVISIONS, SUPERVISORS, QUEUES, PositionAssignment, POSITION } from '../app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-position-overview',
  imports: [CommonModule],
  templateUrl: './position-overview.html',
  styleUrl: './position-overview.scss',
})
export class PositionOverview implements OnInit {
  positionId: number = 0;
  positionName: string = ' ';

  responsibilities: string[] = [];
  division: string = '';
  supervisor: string = '';
  queues: string[] = [];
  users: string[] = [];

  private routeSub?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe to route params - this will trigger whenever we navigate to this route
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.positionId = Number(id);
        this.positionName = POSITION.find((p) => p.id === Number(id))?.name || ''; // displays selected position name in header of position overview page , goes thru positions array matching id and returning name property , if no match found return empty string '
        this.loadPositionData(); // Reload data every time
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadPositionData() {
    //loads saved data that was stored in the local storage
    const respData = localStorage.getItem(`position_${this.positionId}`); // use get item when parsing a string
    if (respData) {
      const data = JSON.parse(respData); //converts respData string into data object
      const selectedCat = data.selected?.find((c: any) => c.key === 'selectedResponsibilities');
      this.responsibilities = selectedCat?.items || []; //loads the responsibilities that were selected and stored in local storage, if there are none it will be an empty array
    }
    const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (assignData) {
      const data: PositionAssignment = JSON.parse(assignData); //converts assignData into data object

      const div = DIVISIONS.find((d) => d.id === data.divisionId); //finds division that matches the division ID saved and stored in local storage
      this.division = div ? div.name : '';

      const sup = SUPERVISORS.find((s) => s.id === data.supervisorId); //finds supervisor that matches the supervisor ID saved and stored in local storage
      this.supervisor = sup ? sup.name : '';

      this.queues = []; //clear queue before data is loaded
      if (data.queueIds) {
        for (let i = 0; i < data.queueIds.length; i++) {
          //loops through queue ids
          const queue = QUEUES.find((q) => q.id === data.queueIds[i]); //finds queue that matches the queue ID saved and stored in local storage
          if (queue) {
            this.queues.push(queue.name); //push queue name and display in position overview
          }
        }
      }

      this.users = []; //clear users before data is loaded
      if (data.users) {
        for (let i = 0; i < data.users.length; i++) {
          //loops through user ids
          this.users.push(data.users[i].name); //push user name and display in position overview
        }
      }
    }
  }

  editResponsibilities() {
    this.router.navigate(['/position', this.positionId, 'responsibilities']); //edit button for responsibilities, routes to responsibilities page
  }

  editDivision() {
    this.router.navigate(['/position', this.positionId, 'division']); //edit button for division, routes to divisions page
  }

  editSupervisor() {
    this.router.navigate(['/position', this.positionId, 'supervisor']); //edit button for supervisor, routes to supervisors page
  }

  editQueues() {
    this.router.navigate(['/position', this.positionId, 'queues']); //edit button for queues, routes to queues page
  }

  editUsers() {
    this.router.navigate(['/position', this.positionId, 'users']); //edit button for users, routes to users page
  }

  goBack() {
    this.router.navigate(['/position']);
  }
}
