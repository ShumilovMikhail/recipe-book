import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { RouterModule } from "@angular/router";
import { ShippingListRouterModule } from "./shopping-list-routing.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { LoggingService } from "../logging.service";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [SharedModule, RouterModule, ShippingListRouterModule, FormsModule],
  // providers: [LoggingService]
})
export class ShoppingListModule { }
