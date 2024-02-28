import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs/operators";


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService)
  const router = inject(Router)
  return authService.user.pipe(
    take(1),
    map((user) => {
      return Boolean(user)
    }),
    tap(isAuthenticate => {
      if (!isAuthenticate) {
        router.navigate(['/auth'])
      }
    })
  )
}
