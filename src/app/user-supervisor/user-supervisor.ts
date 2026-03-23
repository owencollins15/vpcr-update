import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SUPERVISORS, Supervisor, PositionAssignment } from '../app';

@Component({
  selector: 'app-user-supervisor',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-supervisor.html',
  styleUrl: './user-supervisor.scss',
})
export class UserSupervisor implements OnInit {
  positionId: number = 0;
  userId: number = 0;
  userName: string = '';

  supervisor: Supervisor[] = SUPERVISORS;
  filteredSupervisors: Supervisor[] = [];
  selSupervisorId: number = 0;
  supervisorSearchQuery: string = '';
  showSupervisorDropdown: boolean = false;

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
      this.loadSavedSupervisor();
    }
  }

  loadSavedSupervisor() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      const user = data.users?.find((u: any) => u.id === this.userId);
      if (user) {
        this.userName = user.name;
        this.selSupervisorId = user.supervisorId || 0;
        if (this.selSupervisorId !== 0) {
          const supervisor = this.supervisor.find((s) => s.id === this.selSupervisorId);
          this.supervisorSearchQuery = supervisor ? supervisor.name : '';
        }
      }
    }
  }

  filterSupervisors() {
    const query = this.supervisorSearchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredSupervisors = this.supervisor;
    } else {
      this.filteredSupervisors = this.supervisor.filter((s) =>
        s.name.toLowerCase().includes(query),
      );
    }
  }

  selectSupervisor(supervisor: Supervisor) {
    this.selSupervisorId = supervisor.id;
    this.supervisorSearchQuery = supervisor.name;
    this.showSupervisorDropdown = false;
    this.filteredSupervisors = [];
  }

  clearSupervisor() {
    this.selSupervisorId = 0;
    this.supervisorSearchQuery = '';
    this.filteredSupervisors = [];
  }

  getSelSupervisorName() {
    const supervisor = this.supervisor.find((s) => s.id === this.selSupervisorId);
    return supervisor ? supervisor.name : '';
  }

  saveSupervisor() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    const existing = saved
      ? JSON.parse(saved)
      : { divisionId: 0, supervisorId: 0, queueIds: [], users: [] };
    const user = existing.users?.find((u: any) => u.id === this.userId);
    if (user) {
      user.supervisorId = this.selSupervisorId;
    }
    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(existing));
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }

  goBack() {
    if (!this.positionId || !this.userId) {
      console.error('Missing route params', this.positionId, this.userId);
      return;
    }
    this.router.navigate(['/position', this.positionId, 'user', this.userId]);
  }
}
