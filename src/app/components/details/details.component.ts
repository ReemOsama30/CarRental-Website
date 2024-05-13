import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarApiService } from '../../Services/car-api.service';
import { MaintenanceService } from '../../Services/maintenance.service';
import { CommentsComponent } from '../comments/comments.component';
import { CommentServiceService } from '../../Services/commentService/comment-service.service';
import { UserService } from '../../Services/userService/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,CommentsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})


export class DetailsComponent implements OnInit {
  car: any;
  comments:any[]=[];
  maintenance:any

  constructor(
    private route: ActivatedRoute,
    private carService: CarApiService,
    private maintanservice:MaintenanceService,
    private commentService:CommentServiceService,
      private userService:UserService
    
    
  ) { }


  
  rating=0;
  user="";
@Input()readonly :boolean=false;
@Input() carId: number = 0;

  setRating(value:number)
  {

    if(this.readonly)
      {
        return
      }
this.rating=value;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; 

      this.carService.getCarById(id).subscribe(res => {
        this.car = res.message;
      });
      this.maintanservice.getById(id).subscribe(res => {
        this.maintenance = res.message;
        console.log(res.message)
      });

      this.commentService.getcommentbyCarID(id).subscribe(res=> {
      this.comments=res.message;
     console.log(res.message);
 
        }
      );
this.userService.getCurrentUser().subscribe(res=>


this.user=res.message
);


    });
    
  }
}
