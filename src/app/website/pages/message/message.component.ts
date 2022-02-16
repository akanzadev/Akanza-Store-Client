import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}
  goToLogin() {
    this.route.navigate(['/login']);
  }
}
