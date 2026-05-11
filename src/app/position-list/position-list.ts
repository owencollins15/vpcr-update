import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs';

//Export allows me to call interfaces , const in position-users.ts
export interface Position {
  id: number;
  name: string;
  divisionId: number;
  supervisorId: number;
}

@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './position-list.html',
  styleUrl: './position-list.scss',
})

export class PositionList implements OnInit {
  positions: Position[] = this.getPositionList();
  lastSavedPositionId: number | null = null;

  private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

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

  returnHome() {
    console.log('back clicked');
    this.router.navigate(['/']);
  }

  getPositionList() {
    return [
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
      { id: 11, name: 'position 11', divisionId: 0, supervisorId: 0 },
    ];

  }
}
