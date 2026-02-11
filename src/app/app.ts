import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

type CategoryKey = string;

interface SourceCategory{
  key: CategoryKey;
  label: string;
  items: string[];
}
interface SelectedCategory{
  key: CategoryKey;
  items: string[];
}
interface Position{
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
source: SourceCategory[] = [{//source array

//source: json FULLY CUSTOMIZABLE
  key: 'Selected Responsibilities:',
  label: 'Reponsibilities Below: ' ,
  items: [                     //items = responsibilities; for now I have it labeled as responsibility 1-5(subject to change)
    'Responsibility1',
    'Responsibility2',
    'Responsibility3',
    'Responsibility4',
    'Responsibility5'
  ]
}
];


selected: SelectedCategory[] = []; //selected array
positions: Position[] = [
    { id: 1, name: 'position1' },
    { id: 2, name: 'position2' },
    { id: 3, name: 'position3' },
    { id: 4, name: 'position4' },
    { id: 5, name: 'position5' }
];


currentPosition: Position | null = null; //variable can by type Position or null, initialized with type null


selectPos(position: Position){ //select position to edit or delete

  this.currentPosition = position;
  
  console.log('Position Selected!')
}


deletePos(position: Position){ //remove position from list
  const index = this.positions.indexOf(position);
  if(index > -1){
    this.positions.splice(index,1);
    if(this.currentPosition === position){
      this.currentPosition = null;
      this.selected= [];
    }
  }
  console.log('Position Deleted!')
}


private ensureSelectedCategory(key: CategoryKey): SelectedCategory{  //allows lazy initialization
  let cat = this.selected.find(c => c.key === key);
  if(!cat){
    cat = {key, items: []};
    this.selected.push(cat);
  }
  return cat;
}


addItem(categoryKey: CategoryKey, item: string){ //adds specific item
  const cat = this.ensureSelectedCategory(categoryKey);
  if(!cat.items.includes(item)){
cat.items.push(item);
  }
  this.afterAddItem(categoryKey, item);
  console.log('Item Added!')
  }


  addAll(categoryKey: CategoryKey){ //adds all items
    const sourceCat = this.source.find(c => c.key === categoryKey);
    if(!sourceCat) return;
    const selectedCat = this.ensureSelectedCategory(categoryKey);
    sourceCat.items.forEach(item =>{
      if(!selectedCat.items.includes(item)){
        selectedCat.items.push(item);
      }
    });
    this.afterAddAll(categoryKey);
    console.log('All Items Added!')
  }


  removeAll(categoryKey: CategoryKey){//removes all
    const sourceCat = this.source.find(c => c.key === categoryKey);
    if(!sourceCat) return;
     const selectedCat = this.ensureSelectedCategory(categoryKey);
     sourceCat.items.forEach(item =>{
      if(selectedCat.items.includes(item)){
        selectedCat.items = selectedCat.items.filter(i => i !== item);
      }
    } );
this.afterRemoveAll(categoryKey);
console.log('All Items Removed!')
}


removeItem(categoryKey: CategoryKey, item: string){  //allows you to remove an Item that has been selected
  const cat = this.selected.find(c => c.key === categoryKey);
  if(!cat) return;
   cat.items = cat.items.filter(i => i !== item);
   if(cat.items.length === 0){
    this.selected = this.selected.filter(c => c.key !== categoryKey)
   }
this.afterRemoveItem(categoryKey, item);
console.log('Removed Item!')
}


afterAddItem(categoryKey: CategoryKey, item: string){

}

afterAddAll(categoryKey: CategoryKey ){
  
}

afterRemoveItem(categoryKey: CategoryKey, item: string){
  
}

afterRemoveAll(categoryKey: CategoryKey){

}
}
