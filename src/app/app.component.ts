import { Component, Inject, OnInit, inject } from '@angular/core';
import { SECTION } from './header/header.component';
import { LoggingService } from './logging.service';
import { URL_BASE_API } from './core.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'recipe-book';
  constructor(private loggingService: LoggingService) { }
  ngOnInit(): void {
    this.loggingService.printLog('Hello')
  }
}
