import { Component, Input, input } from '@angular/core';
import { CommentServiceService } from '../../Services/commentService/comment-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  constructor(private commentService:CommentServiceService)
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
    const newComment = {
      text: this.commentText,
      rating: this.rating,
      carId:this.carId
    };

    console.log(newComment);
    // Call the service to send the comment
    this.commentService.sendComment(newComment).subscribe(
      (response) => {
        console.log('Comment added successfully:', response);
        // Clear input fields or reset any state as needed
        this.commentText = ''; // Clear the comment text after submission
        this.rating = 0; // Reset the rating after submission
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }
  

}
