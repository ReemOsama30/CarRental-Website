import { Component, Input, input } from '@angular/core';
import { CommentServiceService } from '../../Services/commentService/comment-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/autherizationService/auth.service';
import { CommentSignalrService } from '../../Services/comment-signalr.service';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  constructor(private commentService:CommentServiceService,private authService:AuthService,private commentSignalR:CommentSignalrService)
  {

  }
  rating=0;
  @Input() carId: number = 0; 
@Input()readonly :boolean=false;
commentText = '';
comments: any = [];


ngOnInit() {
  this.commentSignalR.startConnection();

  this.loadComments();

  
}
ngOnDestroy() {
  this.commentSignalR.closeConnection();
}
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
 
  private loadComments() {
    this.commentService.getcommentbyCarID(this.carId).subscribe({
      next: ((comments) => {
        this.comments = comments; // Update comments list with initial data
      }),
      error: ((error) => {
        console.error('Error fetching comments:', error);
      })
    });
  

}
}