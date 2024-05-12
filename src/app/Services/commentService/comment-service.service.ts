import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private _httpclient:HttpClient) {



   }

getAllComments():Observable<any>{

return this._httpclient.get(`${environment.baseURL}/api/comment`);

}


sendComment(comment:object):Observable<any>{
  return this._httpclient.post(`${environment.baseURL}/api/comment`,comment);
}


getcommentbyCarID(carID:number):Observable<any>{
return this._httpclient.get(`${environment.baseURL}/api/comment/${carID}`);

}

}
