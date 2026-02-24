import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SUPERVISORS, Supervisor, PositionAssignment } from '../app';

@Component({
  selector: 'app-position-supervisor',
  imports: [CommonModule, FormsModule],
  templateUrl: './position-supervisor.html',
  styleUrl: './position-supervisor.scss',
})
export class PositionSupervisor implements OnInit {
  positionId: number = 0;
  positionName: string = ' ';

  supervisor: Supervisor[] = SUPERVISORS; //holds array of supervisor objects imported from app.ts , this is what populates the drop down list
  filteredSupervisors: Supervisor[] = []; //filtered results that appear in dropdown
  selSupervisorId: number = 0; //0 indicates no supervisor is selected
  supervisorSearchQuery: string = ''; // supervisor empty
  showSupervisorDropdown: boolean = false;

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
      this.loadSavedSupervisor();
    }
  }

  loadSavedSupervisor() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      this.selSupervisorId = data.supervisorId || 0;

      if (this.selSupervisorId === 0) {
        const supervisor = this.supervisor.find((s) => s.id === this.selSupervisorId);
        this.supervisorSearchQuery = supervisor ? supervisor.name : ' ';
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
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    const existing = saved ? JSON.parse(saved) : {};
    const assignment = {
      ...existing,
      supervisorId: this.selSupervisorId,
    };
    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(assignment));
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }

  goBack() {
    //back button
    this.router.navigate(['/position', this.positionId]);
  }
}
