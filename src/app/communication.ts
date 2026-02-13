import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class Communication {
  
  private messageSource = new BehaviorSubject<string>('');    //Behavior Subject:type of observable that stores immediately and emits its last or initial value
  currentMessage: Observable<string> = this.messageSource.asObservable();//Observable: stream of data that is lazy and only emits value after subscription(action) is made
  //              ^^^^^^^^^^^
  //this allows for message to be displayed after button has been pressed

  constructor(){}

  updatedMessage(message: string){
    this.messageSource.next(message);
  }

}

  

