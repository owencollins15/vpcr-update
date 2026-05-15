import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs';

//Export allows me to call interfaces , const in position-users.ts
export interface Position {
  id: number;
  name: string;
  divisionId: number;
  supervisorId: number;
}

export interface userEntry {
  id: number;
  name?: string;
  divisionId?: number;
  supervisorId?: number;
  queueIds?: number[];
  selected?: any[];
}

export interface PositionAssignment {
  divisionId: number;
  supervisorId: number;
  queueIds: number[];
  users: userEntry[];
}

export function getPositionList() {
  return [
    { id: 1, name: 'Call Center Rep - VPPS 1', divisionId: 0, supervisorId: 0 },
    { id: 2, name: 'Call Center Sup - VPPS 2/3', divisionId: 0, supervisorId: 0 },
    { id: 3, name: 'Call Center Director', divisionId: 0, supervisorId: 0 },
    { id: 4, name: 'Infoline Agent', divisionId: 0, supervisorId: 0 },
    { id: 5, name: '3BDR Investigator', divisionId: 0, supervisorId: 0 },
    { id: 6, name: '3BDR Supervisor', divisionId: 0, supervisorId: 0 },
    { id: 7, name: 'Fulfillment Rep', divisionId: 0, supervisorId: 0 },
    { id: 8, name: 'OSP Investigator', divisionId: 0, supervisorId: 0 },
    { id: 9, name: 'SOAR Investigator', divisionId: 0, supervisorId: 0 },
    { id: 10, name: 'SOAR Supervisor', divisionId: 0, supervisorId: 0 },
    { id: 11, name: 'Non-Criminal Investigator', divisionId: 0, supervisorId: 0 },
    { id: 12, name: 'Criminal Investigator', divisionId: 0, supervisorId: 0 },
    { id: 13, name: 'Supervising Investigator', divisionId: 0, supervisorId: 0 },
    { id: 14, name: 'Inv. Admin. Assistant ', divisionId: 0, supervisorId: 0 },
    { id: 15, name: 'Asst. Chief of Investigations', divisionId: 0, supervisorId: 0 },
    { id: 16, name: 'Death Investigator', divisionId: 0, supervisorId: 0 },
    { id: 17, name: 'Supervising Death Inv.', divisionId: 0, supervisorId: 0 },
  ];
}

@Component({
  selector: 'app-position-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './position-selection.html',
  styleUrl: './position-selection.scss',
})
export class PositionSelection implements OnInit {
  positions: Position[] = getPositionList();
  lastSavedPositionId: number | null = null;

  private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const state = history.state as { saved?: boolean; positionId?: number };
        if (state?.saved && state.positionId !== undefined) {
          this.lastSavedPositionId = state.positionId;
        }
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  goToPosition(pos: { id: number }) {
    this.router.navigate(['/position', pos.id]);
  }

  backToUsers() {
    console.log('back clicked');
    this.router.navigate(['/CreateUser']);
  }
}
