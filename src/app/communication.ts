import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class Communication {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage: Observable<string> = this.messageSource.asObservable();

  constructor(){}

  updatedMessage(message: string){
    this.messageSource.next(message);
  }

}

  

