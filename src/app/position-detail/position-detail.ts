import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Communication } from '../communication';

type CategoryKey = 'selectedResponsibilities';

export interface SourceCategory {
  key: CategoryKey;
  label: string;
  items: string[];
}
export interface SelectedCategory {
  key: CategoryKey;
  items: string[];
}

@Component({
  selector: 'app-position-detail',
  imports: [CommonModule],
  templateUrl: './position-detail.html',
  styleUrl: './position-detail.scss',
})
export class PositionDetail implements OnInit {
  positionId: number = 0;
  positionName: string = '';
  showMessage: boolean = false;
  //source array
  source: SourceCategory[] = [
    {
      //source: json FULLY CUSTOMIZABLE
      key: 'selectedResponsibilities',
      label: 'Responsibilities Below: ',
      //items = responsibilities; for now I have it labeled as responsibility 1-5(subject to change)
      items: [
        'Responsibility1',
        'Responsibility2',
        'Responsibility3',
        'Responsibility4',
        'Responsibility5',
      ],
    },
  ];
  //selected array
  selected: SelectedCategory[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communication: Communication,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.positionId = Number(id);
      this.positionName = `position${id}`;
      this.loadSavedResponsibilities();
    }
    console.log('position selected');
  }

  loadSavedResponsibilities() {
    const saved = localStorage.getItem(`position_${this.positionId}`); //retrieves saved data from local storage for the current position
    if (saved) {
      const data = JSON.parse(saved); //converts saved string into data object
      if (data.selected) {
        this.selected = data.selected; //loads saved data into selected array to display in position detail
        this.selected.forEach((cat) => {
          const sourceCat = this.source.find((c) => c.key === cat.key);
          if (sourceCat) {
            sourceCat.items = sourceCat.items.filter((i) => !cat.items.includes(i));
          }
        });
      }
    }
  }

  private ensureSelectedCategory(key: CategoryKey): SelectedCategory {
    //allows lazy initialization
    let cat = this.selected.find((c) => c.key === key); //cat constant created to find the category in the selected array that matches the provided key
    if (!cat) {
      cat = { key, items: [] }; // if no responsibilities have been selected yet, a new category object is created with the provided key and an empty items array
      this.selected.push(cat); //new object pushed into selected array to be used for storing selected responsibilities as they are added
    }
    return cat;
  }

  addItem(categoryKey: CategoryKey, item: string) {
    //adds specific item and transfers to selected and no longer available
    const cat = this.ensureSelectedCategory(categoryKey);
    if (!cat.items.includes(item)) {
      cat.items.push(item);
      const sourceCat = this.source.find((c) => c.key === categoryKey);
      if (sourceCat) {
        sourceCat.items = sourceCat.items.filter((i) => i !== item);
      }
    }
    console.log('Item Added!');
  }

  addAll(categoryKey: CategoryKey) {
    //adds all items and removes from available
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (!sourceCat) return;
    const selectedCat = this.ensureSelectedCategory(categoryKey);
    sourceCat.items.forEach((item) => {
      if (!selectedCat.items.includes(item)) {
        selectedCat.items.push(item);
      }
    });
    sourceCat.items = [];
    console.log('All Items Added!');
  }

  removeAll(categoryKey: CategoryKey) {
    //removes all items and returns from selected to available
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    const selectedCat = this.ensureSelectedCategory(categoryKey);
    if (!sourceCat || !selectedCat) return;
    sourceCat.items.push(...selectedCat.items);
    sourceCat.items.sort();
    selectedCat.items = [];
    console.log('All Items Removed!');
  }

  removeItem(categoryKey: CategoryKey, item: string) {
    //allows you to remove an Item that has been selected
    const cat = this.selected.find((c) => c.key === categoryKey);
    if (!cat) return;
    cat.items = cat.items.filter((i) => i !== item);
    if (cat.items.length === 0) {
      this.selected = this.selected.filter((c) => c.key !== categoryKey);
    }
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (sourceCat) {
      sourceCat.items.push(item); //pushes selected item back to available after removed
      sourceCat.items.sort(); //sorts pushed item into correct spot in array
    }
    console.log('Removed Item!');
  }

  saveResponsibilities() {
    localStorage.setItem(
      `position_${this.positionId}`,
      JSON.stringify({
        positionId: this.positionId,
        selected: this.selected,
      }),
    ); //localStorage API uses setItem to add values and read back the data saved to local storage , most commonly used for storing json constants
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.cancel();
    }, 1500);
  }

  cancel() {
    this.router.navigate(['/position', this.positionId]); //navigates back to positions
    console.log('cancel successful');
  }
}
