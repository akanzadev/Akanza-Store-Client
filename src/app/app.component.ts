import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  token = '';
  imgRta = '';
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private filesService: FilesService
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

  dowloadPDF() {
    this.filesService
      .getFile(
        'guerra.pdf' /*
        'http://localhost:4600/api/v1/files/demo.pdf', */,
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe({
        next: () => console.log('ok'),
        error: (error: Error) => console.log(error.message),
      });
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe({
        next: (data) => {
          this.imgRta = data.location;
        },
        error: (error: Error) => console.log(error.message),
      });
    }
  }
}
