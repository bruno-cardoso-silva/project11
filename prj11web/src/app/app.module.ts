import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouting } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { REGION , AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserItemComponent } from './admin/user-list/user-item/user-item.component';
import { AdminDetailsComponent } from './admin/admin-details/admin-details.component';
import { AdminEditComponent } from './admin/admin-edit/admin-edit.component';
import { AdminStartComponent } from './admin/admin-start/admin-start.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoppingComponent } from './shopping/shopping.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { SuppleirItemComponent } from './supplier/supplier-list/suppleir-item/suppleir-item.component';
import { SupplierEditComponent } from './supplier/supplier-edit/supplier-edit.component';
import { SupplierStartComponent } from './supplier/supplier-start/supplier-start.component';
import { SupplierDetailsComponent } from './supplier/supplier-details/supplier-details.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductStartComponent } from './product/product-start/product-start.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductItemComponent } from './product/product-list/item/product-item.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CheckInComponent } from './inventory/check-in/check-in.component';
import { CheckOutComponent } from './inventory/check-out/check-out.component';
import { CheckInDetailsComponent } from './inventory/check-in/check-in-details/check-in-details.component';
import { CheckInEditComponent } from './inventory/check-in/check-in-edit/check-in-edit.component';
import { CheckInListComponent } from './inventory/check-in/check-in-list/check-in-list.component';
import { CheckInStartComponent } from './inventory/check-in/check-in-start/check-in-start.component';
import { InventoryItemComponent } from './inventory/check-in/check-in-list/inventory-item/inventory-item.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { DropdownDirective } from './shared/dropdown.directive';
import { CheckOutStartComponent } from './inventory/check-out/check-out-start/check-out-start.component';
import { CheckOutDetailsComponent } from './inventory/check-out/check-out-details/check-out-details.component';
import { CheckOutEditComponent } from './inventory/check-out/check-out-edit/check-out-edit.component';
import { CheckOutListComponent } from './inventory/check-out/check-out-list/check-out-list.component';
import { InventoryItemOutComponent } from './inventory/check-out/check-out-list/inventory-item-out/inventory-item-out.component';
import { AlertComponent } from './shared/alert/alert.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    AdminComponent,
    UserListComponent,
    UserItemComponent,
    AdminDetailsComponent,
    AdminEditComponent,
    AdminStartComponent,
    ShoppingComponent,
    SupplierComponent,
    SupplierListComponent,
    SuppleirItemComponent,
    SupplierEditComponent,
    SupplierStartComponent,
    SupplierDetailsComponent,
    LoadingSpinnerComponent,
    ProductComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductStartComponent,
    ProductEditComponent,
    InventoryComponent,
    CheckInComponent,
    CheckOutComponent,
    CheckInStartComponent,
    CheckInEditComponent,
    CheckInListComponent,
    CheckInDetailsComponent,
    InventoryItemComponent,
    DropdownDirective,
    CheckOutStartComponent,
    CheckOutDetailsComponent,
    CheckOutEditComponent,
    CheckOutListComponent,
    InventoryItemOutComponent,
    AlertComponent
    ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxMaskModule.forRoot(maskConfig),
    AngularFireFunctionsModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: REGION, useValue: 'us-central1' },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { } 
