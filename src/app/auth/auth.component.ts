import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthResponse, AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  @ViewChild('authForm') form
  @ViewChild(PlaceholderDirective) placeholder: PlaceholderDirective
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  private closeSubscription: Subscription

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit() {
    if (!this.form.valid) {
      return
    }
    this.error = null
    this.isLoading = true
    let authObservable: Observable<AuthResponse>

    if (this.isLoginMode) {
      authObservable = this.authService.login(this.form.value)
    } else {
      authObservable = this.authService.signup(this.form.value)
    }
    authObservable.subscribe(
      data => {
        console.log(data)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
        this.isLoading = false
      }
    )
    this.form.reset()
  }

  onCloseModal() {
    this.error = null;
  };

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    this.placeholder.viewContainerRef.clear()
    const alertComponent = this.placeholder.viewContainerRef.createComponent(alertComponentFactory)
    alertComponent.instance.message = message
    this.closeSubscription = alertComponent.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe()
      this.placeholder.viewContainerRef.clear()
    })


  }

};
