import { Component, OnInit } from '@angular/core';
import {
  DIVISIONS,
  SUPERVISORS,
  QUEUES,
  PositionAssignment,
  POSITION,
  userEntry,
  Supervisor,
} from '../position-selection/position-selection';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-supervisor-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './supervisor-component.html',
  styleUrl: './supervisor-component.scss',
})
export class SupervisorComponent implements OnInit {
  positionId: number = 0;
  positionName: string = ' ';
  userId: number = 0;

  supervisor: Supervisor[] = SUPERVISORS; //holds array of supervisor objects imported from app.ts , this is what populates the drop down list
  filteredSupervisors: Supervisor[] = []; //filtered results that appear in dropdown
  selSupervisorId: number = 0; //0 indicates no supervisor is selected
  supervisorSearchQuery: string = ''; // supervisor empty
  showSupervisorDropdown: boolean = false;

  showMessage: boolean = false;
  displayName: string = ' ';
  isUserMode: boolean = false;

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
    } else if (id) {
      //position mode
      this.isUserMode = false;
      this.positionId = Number(id);
      const pos = POSITION.find((p) => p.id === this.positionId);
      this.displayName = pos?.name || '';
    }
    this.loadSavedSupervisor();
  }
  loadSavedSupervisor() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      if (this.isUserMode) {
        const user = data.users?.find((u: any) => u.id === this.userId);
        if (user) {
          this.displayName = user.name || '';
          this.selSupervisorId = user.divisionId || 0;
        }
        if (this.selSupervisorId !== 0) {
          const supervisor = this.supervisor.find((s) => s.id === this.selSupervisorId);
          this.supervisorSearchQuery = supervisor ? supervisor.name : '';
        }
      } else {
        if (this.selSupervisorId === 0) {
          const supervisor = this.supervisor.find((s) => s.id === this.selSupervisorId);
          this.supervisorSearchQuery = supervisor ? supervisor.name : '';
        }
      }
    }
  }

  filterSupervisors() {
    // search logic
    const query = this.supervisorSearchQuery.toLowerCase().trim(); //converts all letters to lower case , removes extra spaces
    if (!query) {
      this.filteredSupervisors = this.supervisor; //if search box is empty show all supervisors
    } else {
      this.filteredSupervisors = this.supervisor.filter(
        (
          s, //otherwise, filter the list to only characters typed in search box
        ) => s.name.toLowerCase().includes(query),
      );
    }
  }
  selectSupervisor(supervisor: Supervisor) {
    //stores supervisor Id  that was just selected
    this.selSupervisorId = supervisor.id;
    this.supervisorSearchQuery = supervisor.name; //puts full name into box when clicked on
    this.showSupervisorDropdown = false; //hides drop down because supervisor has already been selected
    this.filteredSupervisors = []; //clears once selected
  }

  clearSupervisor() {
    // X button for selected supervisor
    this.selSupervisorId = 0; //resets to no supervisor selected
    this.supervisorSearchQuery = ''; //clears box
    this.filteredSupervisors = [];
  }

  getSelSupervisorName() {
    const supervisor = this.supervisor.find((s) => s.id === this.selSupervisorId); //searches through supervisors to find one with matching id
    return supervisor ? supervisor.name : ''; //if supervisor found return name , if not return empty string
  }

  saveSupervisor() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`); //use geItem to parse string into object
    const existing: PositionAssignment = saved
      ? JSON.parse(saved) // parse existing data or initialize a default structure if none exists
      : {
          divisionId: 0,
          supervisorId: 0,
          queueIds: [],
          users: [],
        };
    if (this.isUserMode) {
      const user = existing.users?.find((u: any) => u.id === this.userId);
      if (user) {
        user.supervisorId = this.selSupervisorId || 0;
      }
    } else {
      existing.divisionId = existing.divisionId || 0;
      existing.supervisorId = this.selSupervisorId;
      existing.queueIds = existing.queueIds || [];
      existing.users = existing.users || [];
    }
    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(existing));
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }
  goBack() {
    if (this.isUserMode) {
      this.router.navigate(['/user', this.userId]);
    } else {
      this.router.navigate(['/position', this.positionId]);
    }
  }
}
