import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

export type SECTION = 'recipes' | 'shopping-list'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  public isAuthenticate: boolean = false
  private authSubscription: Subscription
  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticate = !!user
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

  onSaveData() {
    this.dataStorage.storeRecipes().subscribe((data) => console.log(data));
  };

  onFetchData() {
    this.dataStorage.getRecipes();
  }

  onLogout() {
    this.authService.logout()
  }
};
