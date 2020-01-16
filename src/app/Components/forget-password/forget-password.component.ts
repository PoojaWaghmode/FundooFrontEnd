import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserServiceService} from '../../Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material';

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
                private userService:UserServiceService,
                private snackBar:MatSnackBar) { }

                ngOnInit()
                 {
                      this.forgetPasswordForm=this.formBuilder.group (
                      {
                          email:['',[Validators.required,Validators.email]],
                      },
                      );
                 }
     
      forgetPassword()
      {
        let user= {
                    email:this.forgetPasswordForm.value.email
                  }
                  console.log('in functon');
        
                  this.userService.forgetPassword(user).subscribe(response=>
                  {
                          console.log('response after forgetpassword',response);
                          this.snackBar.open(response['message'],'',{
                            duration:2000,
                            verticalPosition: 'top',
                            horizontalPosition:'center'
                          });
                  },
                  error=>
                  {
                          console.log('error msg', error);
                        
                          this.snackBar.open(error['error']['message'] ,'Error Occured',
                          { 
                            duration:50000,
                            verticalPosition: 'top',
                            horizontalPosition:'center' } )
                          })
      }
      
}
