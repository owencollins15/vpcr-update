import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


export type CategoryKey = 'selectedResponsibilities';

export interface SourceCategory{
  key: CategoryKey;
  label: string;
  items: string[];
}
export interface SelectedCategory{
  key: CategoryKey;
  items: string[];
}


@Component({
  selector: 'app-position-detail',
  imports: [],
  templateUrl: './position-detail.html',
  styleUrl: './position-detail.scss',
})
export class PositionDetail {
positionId!: number;

source: SourceCategory[] = [{//source array

//source: json FULLY CUSTOMIZABLE
  key: 'selectedResponsibilities',
  label: 'Reponsibilities Below: ' ,
  items: [                     //items = responsibilities; for now I have it labeled as responsibility 1-5(subject to change)
    'Responsibility1',
    'Responsibility2',
    'Responsibility3',
    'Responsibility4',
    'Editing'
  ]
}
];
constructor(private route: ActivatedRoute){}

selected: SelectedCategory[] = []; //selected array




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


