import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Communication } from '../communication';
import {
  Position,
  getPositionList,
  PositionAssignment,
} from '../position-selection/position-selection';
import { RESPONSIBILITIES } from '../position-detail/position-detail';
import { getDiv, Division } from '../division-component/division-component';
import { getSupervisor, Supervisor } from '../supervisor-component/supervisor-component';

export interface CreatedUser {
  id: number;
  firstName: string;
  lastName: string;
  mi: string;
  email: string;
  workPhone: string;
  mobilePhone: string;
  employmentStatus: string;
  endDate: string;
  inactivateHold: boolean;
  adminNotes: string;
  confirmPassword: string;
  userId: string;
  password: string;
  userRole: string;
  region: string;
  office: string;
  jobTitle: string;
  responsibility: string[];
  newResponsibility: string;
  position: string;
  division: string;
  positionOrganization: string;
  warningEmailSentFlag: boolean;
  divisionId?: number;
  supervisorId?: number;
  queueIds?: number[];
  supervisor?: string;
}

@Component({
  selector: 'app-user-creation',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-creation.html',
  styleUrl: './user-creation.scss',
})
export class UserCreation implements OnInit {
  // User creation fields
  firstName = '';
  lastName = '';
  mi = '';
  email = '';
  workPhone = '';
  mobilePhone = '';
  employmentStatus = '';
  endDate = '';
  inactivateHold = false;
  adminNotes = '';
  userId = '';
  password = '';
  confirmPassword = '';
  userRole = '';
  region = '';
  office = '';
  jobTitle = '';
  responsibility: string[] = [];
  newResponsibility = '';
  position = '';
  division: string = '';
  supervisor = '';
  positionOrganization = '';
  warningEmailSentFlag = false;

  selUserId: number | null = null;

  createdUsers: CreatedUser[] = [];

  positionId: number = 0;

  searchQuery: string = '';
  positions: Position[] = getPositionList();
  supervisors: Supervisor[] = getSupervisor();
  responsibilities = RESPONSIBILITIES;
  showResponsibilities = false;
  divisions: Division[] = getDiv();

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private communication: Communication,
  ) {}

  ngOnInit() {
    const saved = localStorage.getItem('created_users');
    if (saved) {
      this.createdUsers = JSON.parse(saved);
    }
    this.loadCreatedUsers();

    this.subscription = this.communication.currentMessage.subscribe((message) => {
      console.log('Message Received;', message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadCreatedUsers(): void {
    const saved = localStorage.getItem('created_users');
    if (saved) {
      this.createdUsers = JSON.parse(saved);
    }
  }

  selectUser(user: CreatedUser) {
    this.selUserId = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.mi = user.mi;
    this.email = user.email;
    this.workPhone = user.workPhone;
    this.mobilePhone = user.mobilePhone;
    this.employmentStatus = user.employmentStatus;
    this.endDate = user.endDate;
    this.inactivateHold = user.inactivateHold;
    this.adminNotes = user.adminNotes;
    this.userId = user.userId;
    this.password = user.password;
    this.confirmPassword = user.confirmPassword;
    this.userRole = user.userRole;
    this.responsibility = Array.isArray(user.responsibility) ? user.responsibility : [];
    this.newResponsibility = user.newResponsibility;
    this.position = user.position;
    this.division = user.division;
    this.positionOrganization = user.positionOrganization;
    this.warningEmailSentFlag = user.warningEmailSentFlag;
    this.supervisor = user.supervisor || '';
  }

  save(): void {
    if (!this.firstName || !this.lastName || !this.userId) {
      alert('First Name, Last Name, and User ID are required.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (
      !this.hasUpper ||
      !this.hasLower ||
      !this.hasNumber ||
      !this.hasSpecial ||
      this.password.length < 8
    ) {
      alert(
        'Password must be 8+ characters, include both a lower and upper case letter , include a number, and a special character',
      );
      return;
    }
    if (this.selUserId !== null) {
      // Update existing user
      this.createdUsers = this.createdUsers.map((u) =>
        u.id === this.selUserId
          ? {
              ...u,
              firstName: this.firstName,
              lastName: this.lastName,
              mi: this.mi,
              email: this.email,
              workPhone: this.workPhone,
              mobilePhone: this.mobilePhone,
              employmentStatus: this.employmentStatus,
              endDate: this.endDate,
              inactivateHold: this.inactivateHold,
              adminNotes: this.adminNotes,
              userId: this.userId,
              password: this.password,
              userRole: this.userRole,
              responsibility: this.responsibility,
              newResponsibility: this.newResponsibility,
              position: this.position,
              division: this.division,
              supervisor: this.supervisor,
              positionOrganization: this.positionOrganization,
              warningEmailSentFlag: this.warningEmailSentFlag,
            }
          : u,
      );
      this.selUserId = null;
    } else {
      const newUser: CreatedUser = {
        id: Date.now(),
        firstName: this.firstName,
        lastName: this.lastName,
        mi: this.mi,
        email: this.email,
        workPhone: this.workPhone,
        mobilePhone: this.mobilePhone,
        employmentStatus: this.employmentStatus,
        endDate: this.endDate,
        inactivateHold: this.inactivateHold,
        adminNotes: this.adminNotes,
        confirmPassword: this.confirmPassword,
        userId: this.userId,
        password: this.password,
        userRole: this.userRole,
        region: this.region,
        office: this.office,
        jobTitle: this.jobTitle,
        responsibility: this.responsibility,
        newResponsibility: this.newResponsibility,
        position: this.position,
        division: this.division,
        supervisor: this.supervisor,
        positionOrganization: this.positionOrganization,
        warningEmailSentFlag: this.warningEmailSentFlag,
      };

      this.createdUsers = [...this.createdUsers, newUser];
    }
    localStorage.setItem('created_users', JSON.stringify(this.createdUsers));
    this.resetForm();
  }

  loadPositionData() {
    //Initialized positional data
    this.responsibility = [];
    this.newResponsibility = '';
    this.division = '';
    this.supervisor = '';
    //loads saved data that was stored in the local storage
    const respData = localStorage.getItem(`position_${this.position}`); // use get item when parsing a string
    if (respData) {
      const data = JSON.parse(respData); //converts respData string into data object
      const selectedCat = data.selected?.find((c: any) => c.key === 'selectedResponsibilities');
      this.responsibility = selectedCat?.items || []; //loads the responsibilities that were selected and stored in local storage, if there are none it will be an empty array
    }
    const assignData = localStorage.getItem(`position_assignment_${this.position}`);
    if (assignData) {
      const data: PositionAssignment = JSON.parse(assignData); //converts assignData into data object

      const div = getDiv().find((d) => d.id === data.divisionId); //finds division that matches the division ID saved and stored in local storage
      this.division = div ? div.name : ' ';

      const sup = getSupervisor().find((s) => s.id === data.supervisorId); //finds supervisor that matches the supervisor ID saved and stored in local storage
      this.supervisor = sup ? sup.name : ' ';

      console.log('respData:', respData);
      console.log('assignData:', assignData);
    }
  }

  home() {
    this.router.navigate(['/home']);
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.mi = '';
    this.email = '';
    this.workPhone = '';
    this.mobilePhone = '';
    this.employmentStatus = '';
    this.endDate = '';
    this.inactivateHold = false;
    this.adminNotes = '';
    this.userId = '';
    this.password = '';
    this.confirmPassword = '';
    this.userRole = '';
    this.responsibility = [];
    this.newResponsibility = '';
    this.position = '';
    this.division = '';
    this.positionOrganization = '';
    this.warningEmailSentFlag = false;
    this.supervisor = '';
  }

  positionEdit() {
    this.router.navigate(['/position']);
  }

  filteredCreatedUsers() {
    if (!this.searchQuery) return this.createdUsers;
    const query = this.searchQuery.toLowerCase();
    return this.createdUsers.filter(
      (u) =>
        u.firstName.toLowerCase().includes(query) ||
        u.lastName.toLowerCase().includes(query) ||
        u.userId.toLowerCase().includes(query),
    );
  }

  removeUser(id: number) {
    this.createdUsers = this.createdUsers.filter((u) => u.id !== id);

    //  update local storage data so that on reload data stays consistent
    localStorage.setItem('created_users', JSON.stringify(this.createdUsers));
  }

  userRoleEdit(user: CreatedUser) {
    console.log('user role clicked', user);
    this.router.navigate(['/user', user.id]);
  }

  //Password must contain atleast 1 of each
  get hasUpper() {
    return /[A-Z]/.test(this.password); //valid if password contains at least 1 capital letter
  }
  get hasLower() {
    return /[a-z]/.test(this.password); // valid if it contains atleats 1 lowercase
  }
  get hasNumber() {
    return /[0-9]/.test(this.password); // valid if has a number in password
  }
  get hasSpecial() {
    return /[!@#$%^&*]/.test(this.password); //// valid if contains special character
  }
}
