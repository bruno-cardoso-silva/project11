import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDetailsComponent } from "./admin/admin-details/admin-details.component";
import { AdminEditComponent } from "./admin/admin-edit/admin-edit.component";
import { AdminStartComponent } from "./admin/admin-start/admin-start.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthComponent } from "./auth/auth.component";
import { AdminGuard } from "./auth/guard/admin-guard.service";
import { ProviderGuard } from "./auth/guard/provider-guard.service";
import { ProviderComponent } from "./provider/provider.component";
import { ShoppingComponent } from "./shopping/shopping.component";

const appRoute: Routes  = [

  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'shopping', component: ShoppingComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'provider', component: ProviderComponent, canActivate: [ProviderGuard]},
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], 
          children: [ 
            { path: '', component: AdminStartComponent },
            { path: 'new', component: AdminEditComponent },
            { path: ':id', component: AdminDetailsComponent },
            { path: ':id/edit', component: AdminEditComponent}
          ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRouting {

}