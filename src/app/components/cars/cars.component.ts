import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarApiService } from '../../Services/car-api.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  cars:any[]=[];
  currentPage: number = 1;
  searchModel: string = '';
  constructor(private carService:CarApiService)
  {

  }
  ngOnInit() {
    this.fetchCarsByPage(this.currentPage);
    console.log(this.currentPage)
  }

  fetchCarsByPage(page: number) {
    this.carService.getCarsByPage(page).subscribe((res) => {
      this.cars = res.message;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchCarsByPage(page);
  }
  search() {
    if (this.searchModel.trim() !== '') {
      this.carService.searchCarByModel(this.searchModel).subscribe((res) => {
        this.cars = res.message;
      });
    } else {
     
      this.fetchCarsByPage(this.currentPage);
    }
  }
}
