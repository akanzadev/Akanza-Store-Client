import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile!: User;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    /*  zip(
      this.authService.login('admin@gmail.com', '123456789'),
      this.authService.getProfile(this.token)
    ).subscribe({
      next: ([loginRes, profile]) => {
        this.token = loginRes.token;
        this.profile = profile;
      },
    }); */
    this.authService
      .loginAndGetProfile('admin@gmail.com', '123456789')
      .subscribe({
        next: (profile) => {
          this.profile = profile;
        },
      });
  }
}
