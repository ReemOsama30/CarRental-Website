import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class AuthService {


  
  constructor(private _httpclient:HttpClient,private _Router:Router) { }
  userData: any;

  saveUserData() {
    if (localStorage.getItem("token") != null) {
      let encodeToken: any = localStorage.getItem("token");
      let decodeToken = jwtDecode(encodeToken) as any;
      this.userData = decodeToken;
      console.log(decodeToken);

      let userId: string = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? "";
      console.log("User ID:", userId);
    }
  }



  setLogin(loginData:object):Observable<any>{

return this._httpclient.post(`${environment.baseURL}/api/account/login`,loginData);

  }

  Logout()
  {
    localStorage.removeItem("token");
    this._Router.navigate(['/Login']);
    console.log("loged out");

  }

resetPassword(passwordData:object):Observable<any>
{
return this._httpclient.post(`${environment.baseURL}/api/account/reset-password`,passwordData);
}

getUserId(): string | null {
  const token = localStorage.getItem("token");
  if (token) {
    const decodeToken: JwtPayload & { [key: string]: any } = jwtDecode(token);
    return decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
  }
  return null;
}



setRegister(userData:object):Observable<any>
{
 return this._httpclient.post(`${environment.baseURL}/api/account/register`,userData)
}

isAuthenticated(): boolean {
  
  const token = localStorage.getItem('token');
  return !!token; 
}

}
