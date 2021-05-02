import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDetailsComponent } from "./admin/admin-details/admin-details.component";
import { AdminEditComponent } from "./admin/admin-edit/admin-edit.component";
import { AdminStartComponent } from "./admin/admin-start/admin-start.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthComponent } from "./auth/auth.component";
import { AdminGuard } from "./auth/guard/admin-guard.service";
import { ProviderGuard } from "./auth/guard/provider-guard.service";
import { CheckInDetailsComponent } from "./inventory/check-in/check-in-details/check-in-details.component";
import { CheckInEditComponent } from "./inventory/check-in/check-in-edit/check-in-edit.component";
import { CheckInStartComponent } from "./inventory/check-in/check-in-start/check-in-start.component";
import { CheckInComponent } from "./inventory/check-in/check-in.component";
import { CheckOutDetailsComponent } from "./inventory/check-out/check-out-details/check-out-details.component";
import { CheckOutEditComponent } from "./inventory/check-out/check-out-edit/check-out-edit.component";
import { CheckOutStartComponent } from "./inventory/check-out/check-out-start/check-out-start.component";
import { CheckOutComponent } from "./inventory/check-out/check-out.component";
import { InventoryComponent } from "./inventory/inventory.component";
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
  { path: 'auth', component: AuthComponent},
  { path: 'provider', component: SupplierComponent, canActivate: [AdminGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], 
          children: [ 
            { path: '', component: AdminStartComponent },
            { path: 'new', component: AdminEditComponent },
            { path: ':id', component: AdminDetailsComponent },
            { path: ':id/edit', component: AdminEditComponent}
          ]
  },
  { path: 'supplier', component: SupplierComponent,
        children: [ 
          { path: '', component: SupplierStartComponent },
          { path: 'new', component: SupplierEditComponent },
          { path: ':id', component: SupplierDetailsComponent },
          { path: ':id/edit', component: SupplierEditComponent}
        ]
  },
   { path: 'product', component: ProductComponent, canActivate: [AdminGuard],
        children: [ 
          { path: '', component: ProductStartComponent },
          { path: 'new', component: ProductEditComponent },
          { path: ':id', component: ProductDetailsComponent },
          { path: ':id/edit', component: ProductEditComponent}
        ]
  },
  { path: 'inventory', component: InventoryComponent,
      children: [
        { path: 'in', component: CheckInComponent, 
          children: [ 
              { path: '', component: CheckInStartComponent },
              { path: 'new', component: CheckInEditComponent },
              { path: ':id', component: CheckInDetailsComponent },
              { path: ':id/edit', component: CheckInEditComponent}
          ]
        },
        { path: 'out', component: CheckOutComponent,
            children: [ 
              { path: '', component: CheckOutStartComponent },
              { path: 'new', component: CheckOutEditComponent },
              { path: ':id', component: CheckOutDetailsComponent },
              { path: ':id/edit', component: CheckOutEditComponent}
            ]
        }
      ]
  }, 

]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRouting {

}