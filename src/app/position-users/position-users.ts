import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Division,
  DIVISIONS,
  Supervisor,
  SUPERVISORS,
  Queues,
  QUEUES,
  PositionAssignment,
  userEntry,
} from '../app';

@Component({
  selector: 'app-position-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './position-users.html',
  styleUrl: './position-users.scss',
})
export class PositionUsers implements OnInit {
  positionId: number = 0;
  positionName: string = ' ';

  selDivisionId: number = 0;

  users: userEntry[] = []; //users array
  newUser: string = ' ';
  showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    // runs when page loads
    const id = this.route.snapshot.paramMap.get('id'); //grabs id from url
    if (id) {
      this.positionId = Number(id);
      this.positionName = `position${id}`;
      this.loadSavedAssignment(); // restores any previously saved users with saved data
    }
  }

  loadSavedAssignment() {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`); // checks local storage for any users and their division assignment saved to that position
    if (saved) {
      //if found loads users back into the array with their saved data
      const data = JSON.parse(saved); //converts JSON string into a JavaScript Object ex. "users" is now users: [...]
      this.users = data.users || []; //restores users that were added, if data.users exist use it if no use empty array
    }
    console.log('assignment loaded');
  }

  addUser() {
    // add user type box
    const trimmed = this.newUser.trim(); //removes trailing and leading whitespace from strings
    if (!trimmed) return;
    const newUser: userEntry = {
      id: Date.now(), //allows for users to have different id's, if there is two johns instead of removing both it will remove based on the id that is given by Date
      name: trimmed,
    };
    this.users = [...this.users, newUser]; // pushes new user into user array
    this.newUser = ' '; // clears input field or textbox
    console.log('user added');
  }

  removeUser(id: number) {
    // removes user when clicked, reads user id and filters out user whose id matches the one you chose to removes
    this.users = this.users.filter((u) => u.id !== id);
    console.log('user removed');
  }
  save(): void {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);

    let divisionId = 0;
    let supervisorId = 0;
    let queueIds: number[] = [];

    if (saved) {
      const existing = JSON.parse(saved);
      divisionId = existing.divisionId || 0;
      supervisorId = existing.supervisorId || 0;
      queueIds = existing.queueIds || [];
    }

    const assignment = {
      divisionId: divisionId,
      supervisorId: supervisorId,
      queueIds: queueIds,
      users: this.users,
    };

    console.log('Saving this object:', assignment);

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

  onEnter(event: KeyboardEvent) {
    //lets us add user after hitting enter instead of clicking 'add user'
    if (event.key === 'Enter') this.addUser();
  }
}
