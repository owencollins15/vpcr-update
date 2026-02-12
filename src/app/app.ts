import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { Communication } from './communication';
import { Subscription } from 'rxjs';


interface Position{
  id: number;
  name: string;
}
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  positions: Position[] = [        //positions array with json constants
    { id: 1, name: 'position1' },
    { id: 2, name: 'position2' },
    { id: 3, name: 'position3' },
    { id: 4, name: 'position4' },
    { id: 5, name: 'position5' }
];
lastSavedPositionId: number | null = null; 

private subscription!: Subscription;
constructor(private router: Router, private communication: Communication){
 this.router.events.subscribe(event =>{
  if (event instanceof NavigationEnd){
const state =history.state as { saved?: boolean; positionId?: number;};

  if (state?.saved && state.positionId){
    this.lastSavedPositionId=state.positionId;
    setTimeout(()=>{
      this.lastSavedPositionId = null;
    }, 5000);
  }
   }
});
}

ngOnInit() {
    this.subscription = this.communication.currentMessage.subscribe(message => {
      console.log('Message Received;', message);
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


goToPosition(pos: { id: number}){
  this.router.navigate(['/position',pos.id]);
}
}