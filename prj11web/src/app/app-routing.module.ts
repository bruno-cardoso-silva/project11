import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDetailsComponent } from "./admin/admin-details/admin-details.component";
import { AdminEditComponent } from "./admin/admin-edit/admin-edit.component";
import { AdminStartComponent } from "./admin/admin-start/admin-start.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthComponent } from "./auth/auth.component";
import { AdminGuard } from "./auth/guard/admin-guard.service";
import { ProviderGuard } from "./auth/guard/provider-guard.service";
import { ProductDetailsComponent } from "./product/product-details/product-details.component";
import { ProductEditComponent } from "./product/product-edit/product-edit.component";
import { ProductStartComponent } from "./product/product-start/product-start.component";
import { ProductComponent } from "./product/product.component";
import { ShoppingComponent } from "./shopping/shopping.component";
import { SupplierDetailsComponent } from "./supplier/supplier-details/supplier-details.component";
import { SupplierEditComponent } from "./supplier/supplier-edit/supplier-edit.component";
import { SupplierStartComponent } from "./supplier/supplier-start/supplier-start.component";
import { SupplierComponent } from "./supplier/supplier.component";

const appRoute: Routes  = [

  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'shopping', component: ShoppingComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'provider', component: SupplierComponent, canActivate: [ProviderGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], 
          children: [ 
            { path: '', component: AdminStartComponent },
            { path: 'new', component: AdminEditComponent },
            { path: ':id', component: AdminDetailsComponent },
            { path: ':id/edit', component: AdminEditComponent}
          ]
  },
//  { path: 'supplier', component: SupplierComponent, canActivate: [AdminGuard], 
  { path: 'supplier', component: SupplierComponent, 
        children: [ 
          { path: '', component: SupplierStartComponent },
          { path: 'new', component: SupplierEditComponent },
          { path: ':id', component: SupplierDetailsComponent },
          { path: ':id/edit', component: SupplierEditComponent}
        ]
  },
  //  { path: 'product', component: SupplierComponent, canActivate: [AdminGuard], 
  { path: 'product', component: ProductComponent, 
        children: [ 
          { path: '', component: ProductStartComponent },
          { path: 'new', component: ProductEditComponent },
          { path: ':id', component: ProductDetailsComponent },
          { path: ':id/edit', component: ProductEditComponent}
        ]
  },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRouting {

}