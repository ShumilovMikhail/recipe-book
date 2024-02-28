import { Injectable, inject } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, pluck, take } from "rxjs/operators";

export const AuthInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  return authService.user.pipe(
    take(1),
    pluck('token'),
    exhaustMap(token => {
      if (token === null) {
        return next(req)
      }
      const reqClone = req.clone({ params: new HttpParams().set('auth', token) })
      return next(reqClone)
    }),)
}
