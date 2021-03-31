import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {User } from 'src/app/auth/user.model'
@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {

  user: User;
  id: string;
  roles= [];

  constructor(private authSvc: AuthService, 
              private actdRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.actdRoute.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.authSvc.getUserById(this.id).subscribe(user => {
            this.roles  = user.customClaims? Object.entries(user.customClaims): [];
            this.user = user;
        })
        }, err => {
         console.log(err);
         throw err;
        })
  }

  onEditClicked(){
    this.router.navigate(['edit'], {relativeTo: this.actdRoute});
  }

}
