import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  show = false;
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.loader$.subscribe({
      next: (value) => {
        this.show = value;
      },
    });
  }
}
