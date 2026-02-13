import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, RouterLinkWithHref } from '@angular/router'
import { Communication } from './communication';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs';


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
     { id: 1, name: 'position 1' },
     { id: 2, name: 'position 2' },
     { id: 3, name: 'position 3' },
     { id: 4, name: 'position 4' },
     { id: 5, name: 'position 5' }
 ];
 lastSavedPositionId: number | null = null; //
 showPositionList = true;

 private subscription!: Subscription;  
 private routerSubscription!: Subscription;  //

 constructor(private router: Router, private communication: Communication){
 this.router.events.pipe(filter(event => event  //emits router events for every navigation, this will run for every navigation even when you return from responsibilities page
      instanceof NavigationEnd)).subscribe(()=>{
        this.showPositionList = !this.router.url.includes('/position/')// hides positions list once a position is selected, shows again once returned

  this.showPositionList = !this.router.url.includes('/position/');
  const state = history.state as { //history.state is a native browser api that stores data passed during a navigation
    saved?: boolean;               //saved is true when the button gets pressed
    positionId?:number;            //saves responsibilities to exact position id
  };

  if (state?.saved && state.positionId){   //only show a message if save button is pressed
    this.lastSavedPositionId = state.positionId; //re renders template and displays message after save
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
     this.routerSubscription.unsubscribe();
   }
 
 
 goToPosition(pos: { id: number}){
   this.router.navigate(['/position',pos.id]);
 }
 }
 
 
