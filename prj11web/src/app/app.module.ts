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
import { ItemComponent } from './product/product-list/item/item.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductStartComponent } from './product/product-start/product-start.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';


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
    ItemComponent,
    ProductDetailsComponent,
    ProductStartComponent,
    ProductEditComponent    

    ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: REGION, useValue: 'us-central1' },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { } 
