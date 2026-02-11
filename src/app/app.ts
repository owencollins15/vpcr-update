import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'

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
  positions: Position[] = [
    { id: 1, name: 'position1' },
    { id: 2, name: 'position2' },
    { id: 3, name: 'position3' },
    { id: 4, name: 'position4' },
    { id: 5, name: 'position5' }
];constructor(private router: Router){}

goToPosition(pos: { id: number}){
  this.router.navigate(['/position',pos.id]);
}
}