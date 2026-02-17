import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface userEntry {
  id: number;
  name: string;
}

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
      this.loadSavedUsers(); // restores any previously saved users with saved data
    }
  }

  loadSavedUsers() {
    const saved = localStorage.getItem(`position_users_${this.positionId}`); // checks local storage for any users saved to that position , if found loads users back into the array with their saved data
    if (saved) {
      this.users = JSON.parse(saved);
    }
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
  }
  removeUser(id: number) {
    // removes user when clicked, reads user id and filters out user whose id matches the one you chose to removes
    this.users = this.users.filter((u) => u.id !== id);
  }
  save() {
    localStorage.setItem(`position_users_${this.positionId}`, JSON.stringify(this.users)); // user saved message, same logic for other save button
    this.showMessage = true;
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
