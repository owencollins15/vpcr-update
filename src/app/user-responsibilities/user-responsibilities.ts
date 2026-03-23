import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Communication } from '../communication';
import { DIVISIONS, Division, PositionAssignment } from '../app';
import { FormsModule } from '@angular/forms';

type CategoryKey = 'selectedResponsibilities';

interface SourceCategory {
  key: CategoryKey;
  label: string;
  items: string[];
}

interface SelectedCategory {
  key: CategoryKey;
  items: string[];
}

@Component({
  selector: 'app-user-responsibilities',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-responsibilities.html',
  styleUrl: './user-responsibilities.scss',
})
export class UserResponsibilities implements OnInit {
  positionId: number = 0;
  userId: number = 0;
  positionName: string = '';
  showMessage = false;

  source: SourceCategory[] = [
    {
      key: 'selectedResponsibilities',
      label: 'Responsibilities Below:',
      items: [
        'Responsibility1',
        'Responsibility2',
        'Responsibility3',
        'Responsibility4',
        'Responsibility5',
      ],
    },
  ];

  // Selected responsibilities
  selected: SelectedCategory[] = [];

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
      this.loadSavedResponsibilities();
    }
  }

  // Data Loading
  loadSavedResponsibilities(): void {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data = JSON.parse(saved);
      const user = data.users?.find((u: any) => u.id === this.userId);
      if (user && user.selected) {
        this.selected = user.selected;
        this.selected.forEach((cat) => {
          const sourceCat = this.source.find((c) => c.key === cat.key);
          if (sourceCat) {
            sourceCat.items = sourceCat.items.filter((item) => !cat.items.includes(item));
          }
        });
      }
    }
  }

  private ensureSelectedCategory(key: CategoryKey): SelectedCategory {
    let cat = this.selected.find((c) => c.key === key);
    if (!cat) {
      cat = { key, items: [] };
      this.selected.push(cat);
    }
    return cat;
  }

  addItem(categoryKey: CategoryKey, item: string): void {
    const selectedCat = this.ensureSelectedCategory(categoryKey);

    if (!selectedCat.items.includes(item)) {
      selectedCat.items.push(item);

      const sourceCat = this.source.find((c) => c.key === categoryKey);
      if (sourceCat) {
        sourceCat.items = sourceCat.items.filter((i) => i !== item);
      }
    }
  }

  addAll(categoryKey: CategoryKey): void {
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (!sourceCat) return;

    const selectedCat = this.ensureSelectedCategory(categoryKey);

    sourceCat.items.forEach((item) => {
      if (!selectedCat.items.includes(item)) {
        selectedCat.items.push(item);
      }
    });

    sourceCat.items = [];
  }

  removeItem(categoryKey: CategoryKey, item: string): void {
    const selectedCat = this.selected.find((c) => c.key === categoryKey);
    if (!selectedCat) return;

    selectedCat.items = selectedCat.items.filter((i) => i !== item);

    if (selectedCat.items.length === 0) {
      this.selected = this.selected.filter((c) => c.key !== categoryKey);
    }

    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (sourceCat) {
      sourceCat.items.push(item);
      sourceCat.items.sort();
    }
  }

  removeAll(categoryKey: CategoryKey): void {
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    const selectedCat = this.ensureSelectedCategory(categoryKey);

    if (!sourceCat) return;

    sourceCat.items.push(...selectedCat.items);
    sourceCat.items.sort();
    selectedCat.items = [];
  }

  saveResponsibilities(): void {
    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    const existing = saved
      ? JSON.parse(saved)
      : {
          divisionId: 0,
          supervisorId: 0,
          queueId: [],
          users: [],
        };
    const user = existing.users?.find((u: any) => u.id === this.userId);
    if (user) {
      user.selected = this.selected;
    }
    localStorage.setItem(`position_assignment_${this.positionId}`, JSON.stringify(existing));
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.cancel();
    }, 1500);
  }

  cancel(): void {
    if (!this.positionId || !this.userId) {
      console.error('Missing route params', this.positionId, this.userId);
      return;
    }
    this.router.navigate(['/position', this.positionId, 'user', this.userId]);
  }
}
