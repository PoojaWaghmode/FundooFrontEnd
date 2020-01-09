import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserServiceService} from '../../Services/UserService/user-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm:FormGroup
  submitted=false;

  constructor( private matcard: MatCardModule,
                private formBuilder:FormBuilder,
                private router:Router,
                private userService:UserServiceService) { }

                ngOnInit() {
                  this.forgetPasswordForm=this.formBuilder.group
                   ({
                     email:['',Validators.required],
                    },
            );
      }
      get f(){return this.forgetPasswordForm.controls;}
      forgetPassword()
      {
        let user= {
          email:this.forgetPasswordForm.value.email
        }
        console.log('in functon');
        
        this.userService.forgetPassword(user).subscribe(response=>
          {
          console.log('response after forgetpassword',response);
          //this.router.navigate(['/resetpassword'])

        },
        error=>
        {
        console.log('error msg', error);
        })
      }
      onsubmit()
      {
        this.submitted=true;
      }

}
