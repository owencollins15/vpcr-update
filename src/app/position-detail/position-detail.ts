import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Communication } from '../communication';

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
  selector: 'app-position-detail',
  imports: [CommonModule],
  templateUrl: './position-detail.html',
  styleUrl: './position-detail.scss',
})
export class PositionDetail implements OnInit {
  positionId: number = 0;
  positionName: string = '';
  showMessage = false;
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
    const saved = localStorage.getItem(`position_${this.positionId}`);
    if (saved) {
      this.selected = JSON.parse(saved);
    }
  }

  private ensureSelectedCategory(key: CategoryKey): SelectedCategory {
    //allows lazy initialization
    let cat = this.selected.find((c) => c.key === key); //cat constant created to load content after its selected , this function allows for when I click one of the action buttons , the buttons work
    if (!cat) {
      cat = { key, items: [] };
      this.selected.push(cat);
    }
    return cat;
  }

  addItem(categoryKey: CategoryKey, item: string) {
    //adds specific item
    const cat = this.ensureSelectedCategory(categoryKey);
    if (!cat.items.includes(item)) {
      cat.items.push(item);
    }
    console.log('Item Added!');
  }

  addAll(categoryKey: CategoryKey) {
    //adds all items
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (!sourceCat) return;
    const selectedCat = this.ensureSelectedCategory(categoryKey);
    sourceCat.items.forEach((item) => {
      if (!selectedCat.items.includes(item)) {
        selectedCat.items.push(item);
      }
    });
    console.log('All Items Added!');
  }

  removeAll(categoryKey: CategoryKey) {
    //removes all
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (!sourceCat) return;
    const selectedCat = this.ensureSelectedCategory(categoryKey);
    sourceCat.items.forEach((item) => {
      if (selectedCat.items.includes(item)) {
        selectedCat.items = selectedCat.items.filter((i) => i !== item);
      }
    });
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
    console.log('Removed Item!');
  }

  saveAndReturn() {
    localStorage.setItem(`position_${this.positionId}`, JSON.stringify(this.selected)); //localStorage API uses setItem to add values and read back the data saved to local storage , most commonly used for storing json constants
    this.router.navigate(['/'], {
      state: {
        saved: true,
        positionId: this.positionId,
      },
    });
  }

  cancel() {
    this.router.navigate(['/']); //navigates back to positions
    console.log('cancel successful');
  }

  saveMessage() {
    const newMessage = 'Position has been saved.';
    this.communication.updatedMessage(newMessage);
  }

  goToUsers(): void {
    this.router.navigate(['/position', this.positionId, 'users']);
    console.log('arrived at users');
  }

  wrapperFunction() {
    //wrapper function allows for the responsibilities to be saved to the position and for the message to be displayed after save button is pressed
    this.saveMessage();
    this.saveAndReturn();
    console.log('save executed');
  }
}
