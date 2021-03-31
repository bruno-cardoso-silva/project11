import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  f: FormGroup;
  id: number;
  editMode= false;
  email: string;
  uid: string
  roles = new FormArray([]);
  faUser = faUser;

  
  constructor(private route: ActivatedRoute, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm(this.id+"");
      });
  }

  private initForm(uid: string){
      if(this.editMode){
          const user = this.authSvc.getUserById(uid)
            .subscribe(user=>{
              this.email  = user.email;
              this.uid = user.uid;  
              if(user['customClaims']){
                for(let role of Object.entries(user.customClaims)){
                  this.roles.push(new FormGroup({
                      'role': new FormControl({value: role[0]+":"+role[1], disabled: true})
                    }))
                } 
              }

            })
      }

      this.f = new FormGroup({
        'email': new FormControl({value: this.email, disabled: true}, Validators.required),
        'uid': new FormControl({value: this.uid, disabled: true}, Validators.required),
        'roles': this.roles
      });
  
  }

  get controls() { // a getter!
    return (<FormArray >this.f.get('roles')).controls;
  }

  addAdminRole(){
    this.authSvc.addAdminClaim(this.email).subscribe(response => {
      console.log(response)
    })
  }

  addProviderRole(){
      this.authSvc.addProviderClaim(this.email).subscribe(response => {
          console.log(response)
      })
  }

  onCancel(){
      this.router.navigate(['../'], {relativeTo: this.route});
  }

    
}
