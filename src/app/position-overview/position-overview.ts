import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DIVISIONS, SUPERVISORS, QUEUES, PositionAssignment, userEntry } from '../app';

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
  division: string = 'Not Set';
  supervisor: string = 'Not Set';
  queues: string[] = [];
  users: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.positionId = Number(id);
      this.positionName = `position${id}`;
      this.loadPositionData();
    }
    console.log('position selected');
  }
  loadPositionData() {
    const respData = localStorage.getItem(`position_${this.positionId}`);
    if (respData) {
      const data = JSON.parse(respData);
      const selectedCat = data.selected?.find((c: any) => c.key === 'selectedResponsibilities');
      this.responsibilities = selectedCat?.items || [];
    }
    const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (assignData) {
      const data: PositionAssignment = JSON.parse(assignData);

      const div = DIVISIONS.find((d) => d.id === data.divisionId);
      this.division = div ? div.name : 'not set';

      const sup = SUPERVISORS.find((s) => s.id === data.supervisorId);
      this.supervisor = sup ? sup.name : 'not set';

      this.queues = [];
      if (data.queueIds) {
        for (let i = 0; i < data.queueIds.length; i++) {
          const queue = QUEUES.find((q) => q.id === data.queueIds[i]);
          if (queue) {
            this.queues.push(queue.name);
          }
        }
      }

      this.users = [];
      if (data.users) {
        for (let i = 0; i < data.users.length; i++) {
          this.users.push(data.users[i].name);
        }
      }
    }
  }

  editResponsibilities() {
    this.router.navigate(['/position', this.positionId, 'responsibilities']);
  }

  editDivision() {
    this.router.navigate(['/position', this.positionId, 'division']);
  }

  editSupervisor() {
    this.router.navigate(['/position', this.positionId, 'supervisor']);
  }

  editQueues() {
    this.router.navigate(['/position', this.positionId, 'queues']);
  }

  editUsers() {
    this.router.navigate(['/position', this.positionId, 'users']);
  }

  goBack() {
    this.router.navigate(['/positions']);
  }
}
