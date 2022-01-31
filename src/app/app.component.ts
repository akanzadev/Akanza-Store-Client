import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}
  onLoaded(img: string) {
    console.log('loaded padre' + img);
  }

  createUser() {
    this.userService
      .create({
        email: 'admin@gmail.com',
        password: '123456789',
        role: 'admin',
      })
      .subscribe({
        next: (user) => console.log(user),
        error: (error: Error) => console.log(error.message),
      });
  }
  login() {
    this.authService.login('admin@gmail.com', '123456789').subscribe({
      next: (user) => console.log(user),
      error: (error: Error) => console.log(error.message),
    });
  }
}
