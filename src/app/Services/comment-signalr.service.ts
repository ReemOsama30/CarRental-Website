import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class CommentSignalrService {

  private hubConnection: HubConnection | null = null;
  baseUrl = 'http://localhost:61421/commentHub';
  constructor() { }


  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl)
      .build();
  
    this.hubConnection.on('NewComment', (text, carId, rating) => {
      // Handle incoming new comment information (e.g., update UI)
      console.log('New comment received:', text, carId, rating);
    });
  
    this.hubConnection.start().then(() => console.log('Connection started'))
      .catch(err => console.error('Error starting connection:', err));
  }
  
  closeConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('Connection stopped'))
        .catch(err => console.error('Error stopping connection:', err));
    }
  }
  
}
