import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Communication } from '../communication';


@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private subscription!: Subscription;

  constructor(
    private router: Router,
    private communication: Communication,
  ) {}

  ngOnInit() {
    this.subscription = this.communication.currentMessage.subscribe((message) => {
      console.log('Message Received;', message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
