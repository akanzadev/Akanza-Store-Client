import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/auth.model';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from './../../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  profile!: User | null;
  categories!: Category[];
  subMenuActive: boolean = false;
  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe((user) => {
      this.profile = user;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  signIn() {
    /*  zip(
      this.authService.login('admin@gmail.com', '123456789'),
      this.authService.getProfile(this.token)
    ).subscribe({
      next: ([loginRes, profile]) => {
        this.token = loginRes.token;
        this.profile = profile;
      },
    }); */
    /*   this.authService
      .loginAndGetProfile('admin@gmail.com', '123456789')
      .subscribe({
        next: (profile) => {
          this.profile = profile;
        },
      }); */
    this.authService
      .loginAndGetProfile('akanzaakamaru@gmail.com', '123456789')
      .subscribe({
        next: (profile) => this.router.navigate(['/profile']),
      });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }
  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/']);
  }
  showSubMenu() {
    this.subMenuActive = !this.subMenuActive;
  }
}
