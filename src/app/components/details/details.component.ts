import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarApiService } from '../../Services/car-api.service';
import { MaintenanceService } from '../../Services/maintenance.service';
import { CommentsComponent } from '../comments/comments.component';
import { CommentServiceService } from '../../Services/commentService/comment-service.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,CommentsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})


export class DetailsComponent implements OnInit {
  car: any;
  comments:any;
  maintenance:any

  constructor(
    private route: ActivatedRoute,
    private carService: CarApiService,
    private maintanservice:MaintenanceService,
    private commentService:CommentServiceService,
      
    
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 
      this.carService.getCarById(id).subscribe(res => {
        this.car = res.message;
      });
      this.maintanservice.getById(id).subscribe(res => {
        this.maintenance = res.message;
      });

      this.commentService.getcommentbyCarID(id).subscribe(res=> {
      this.comments=res.message;
        }
      );

    });
    
  }
}
