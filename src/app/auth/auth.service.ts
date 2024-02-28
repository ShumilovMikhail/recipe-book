import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscription, from, interval, observable, of, throwError } from "rxjs";
import { catchError, pluck, subscribeOn, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment.development";


export interface UserData {
  email: string
  password: string
}


export interface AuthResponse {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  public user = new BehaviorSubject<User>(null);

  private userSubscription: Subscription;
  private tokenExpirationDate;
  private signupAPI: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  private loginAPI: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

  constructor(private http: HttpClient, private router: Router) {
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.autoLogin()
    this.userSubscription = this.user.subscribe(user => {
      if (!user) {
        return
      }
      this.router.navigate(['/recipes'])
    })
  }

  signup(user: UserData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.signupAPI, { ...user, returnSecureToken: true }).pipe(catchError(this.handleError), tap(this.handleAuthentication))
  }

  login(user: UserData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginAPI, { ...user, returnSecureToken: true }).pipe(catchError(this.handleError), tap(this.handleAuthentication))
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData')
    if (this.tokenExpirationDate) {
      clearTimeout(this.tokenExpirationDate)
    }
    this.tokenExpirationDate = null
  }

  private autoLogout(expirationDate: number) {
    this.tokenExpirationDate = setTimeout(() => {
      this.logout()
    }, expirationDate);
  }

  private autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return
    }
    this.autoLogout(new Date(user._tokenExpirationDate).getTime() - new Date().getTime())
    this.user.next(new User(user.email, user.id, user._token, user._tokenExpirationDate))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occurred!'

    if (errorResponse.error || errorResponse.error.error) {

      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already'
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email xuita polnaya'
          break
        case 'INVALID_PASSWORD':
          errorMessage = 'PASSWORD SMENI YEBOK'
          break;
      }

    }

    return throwError(errorMessage)
  }

  private handleAuthentication(responseData: AuthResponse) {
    const { email, idToken, localId, expiresIn } = responseData
    const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000)
    const user = new User(email, localId, idToken, expirationDate)
    this.user.next(user);
    this.autoLogout(Number(expiresIn) * 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
