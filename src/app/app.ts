import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Communication } from './communication';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs';

//Export allows me to call interfaces , const in position-users.ts
export interface Position {
  id: number;
  name: string;
  divisionId: number;
  supervisorId: number;
}
export interface Division {
  id: number;
  name: string;
}
export const DIVISIONS: Division[] = [
  { id: 1, name: 'division 1' },
  { id: 2, name: 'division 2' },
  { id: 3, name: 'division 3' },
  { id: 4, name: 'division 4' },
  { id: 5, name: 'division 5' },
];

export interface Supervisor {
  id: number;
  name: string;
}

export const SUPERVISORS: Supervisor[] = [
  { id: 1, name: 'supervisor 1' },
  { id: 2, name: 'supervisor 2' },
  { id: 3, name: 'supervisor 3' },
  { id: 4, name: 'supervisor 4' },
  { id: 5, name: 'supervisor 5' },
];

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  positions: Position[] = [
    //positions array with json constants
    { id: 1, name: 'position 1', divisionId: 0, supervisorId: 0 },
    { id: 2, name: 'position 2', divisionId: 0, supervisorId: 0 },
    { id: 3, name: 'position 3', divisionId: 0, supervisorId: 0 },
    { id: 4, name: 'position 4', divisionId: 0, supervisorId: 0 },
    { id: 5, name: 'position 5', divisionId: 0, supervisorId: 0 },
    { id: 6, name: 'position 6', divisionId: 0, supervisorId: 0 },
    { id: 7, name: 'position 7', divisionId: 0, supervisorId: 0 },
    { id: 8, name: 'position 8', divisionId: 0, supervisorId: 0 },
    { id: 9, name: 'position 9', divisionId: 0, supervisorId: 0 },
    { id: 10, name: 'position 10', divisionId: 0, supervisorId: 0 },
  ];
  lastSavedPositionId: number | null = null; //can be either type number or type null , initialized as null
  showPositionList = true;

  private subscription!: Subscription; //subscription for the message to be shown when saved
  private routerSubscription!: Subscription; //subscription for the change of route, displays save message after save is pressed and route returns to positions

  constructor(
    private router: Router,
    private communication: Communication,
  ) {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof //emits router events for every navigation, this will run for every navigation even when you return from responsibilities page
            NavigationEnd,
        ),
      )
      .subscribe(() => {
        this.showPositionList = !this.router.url.includes('/position/'); // hides positions list once a position is selected, shows again once returned
        const state = history.state as {
          //history.state is a native browser api that stores data passed during a navigation
          saved?: boolean; //saved is true when the button gets pressed
          positionId?: number; //saves responsibilities to exact position id
        };

        if (state?.saved && state.positionId) {
          //only show a message if save button is pressed
          this.lastSavedPositionId = state.positionId; //re renders template and displays message after save
        }
      });
  }

  ngOnInit() {
    this.subscription = this.communication.currentMessage.subscribe((message) => {
      console.log('Message Received;', message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  goToPosition(pos: { id: number }) {
    this.router.navigate(['/position', pos.id]);
  }
}
