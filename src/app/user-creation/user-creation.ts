import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Communication } from '../communication';

interface CreatedUser {
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
  responsibility: string;
  newResponsibility: string;
  position: string;
  division: string;
  positionOrganization: string;
  warningEmailSentFlag: boolean;
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
  responsibility = '';
  newResponsibility = '';
  position = '';
  division = '';
  positionOrganization = '';
  warningEmailSentFlag = false;

  selUserId: number | null = null;

  createdUsers: CreatedUser[] = [];

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private communication: Communication,
  ) {}

  ngOnInit() {
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
    this.responsibility = user.responsibility;
    this.newResponsibility = user.newResponsibility;
    this.position = user.position;
    this.division = user.division;
    this.positionOrganization = user.positionOrganization;
    this.warningEmailSentFlag = user.warningEmailSentFlag;
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
        responsibility: this.responsibility,
        newResponsibility: this.newResponsibility,
        position: this.position,
        division: this.division,
        positionOrganization: this.positionOrganization,
        warningEmailSentFlag: this.warningEmailSentFlag,
      };

      this.createdUsers = [...this.createdUsers, newUser];
    }
    localStorage.setItem('created_users', JSON.stringify(this.createdUsers));
    this.resetForm();
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
    this.responsibility = '';
    this.newResponsibility = '';
    this.position = '';
    this.division = '';
    this.positionOrganization = '';
    this.warningEmailSentFlag = false;
  }

  assignPosition(user: any) {
    console.log('button clicked', user);
    this.router.navigate(['/position']);
  }
  removeUser(id: number) {
    this.createdUsers = this.createdUsers.filter((u) => u.id !== id);

    //  update local storage data so that on reload data stays consistent
    localStorage.setItem('created_users', JSON.stringify(this.createdUsers));
  }
}
