import { Component, Input, input } from '@angular/core';
import { CommentServiceService } from '../../Services/commentService/comment-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/autherizationService/auth.service';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  constructor(private commentService:CommentServiceService,private authService:AuthService)
  {

  }
  rating=0;
  @Input() carId: number = 0; 
@Input()readonly :boolean=false;
commentText = '';
  setRating(value:number)
  {

    if(this.readonly)
      {
        return
      }
this.rating=value;
  }


  addComment() {
  
    // if (!this.authService.isAuthenticated()) {
    //   console.error('User is not authenticated. Cannot add comment.');
     
    //   return;
    // }
  
  
    const newComment = {
      text: this.commentText,
      rating: this.rating,
      carId: this.carId,
      userId: this.authService.getUserId()
    };
  
    console.log(newComment);
  
    // this.commentService.sendComment(newComment).subscribe(
    //   (response) => {
    //     console.log('Comment added successfully:', response);

    //     this.commentText = ''; 
    //     this.rating = 0; 
    //   },
    //   (error) => {
    //     console.error('Error adding comment:', error);
    //   }
    // );

    this.commentService.sendComment(newComment).subscribe({
      next:((response)=>{
        console.log('Comment added successfully:', response);
        this.commentText = ''; 
        this.rating = 0; 
      }),
      error:((error)=>{
        console.error('Error adding comment:', error);
      })
    })
  }
 
  
  

}
