import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup
  submitted=false;

  constructor(private matcard:MatCardModule,
              private formBuilder:FormBuilder,
              private router:Router,
              private userService:UserServiceService) { }

              ngOnInit() {
                          this.loginform=this.formBuilder.group ({
               
                  email:['',Validators.required],
                password: ['', [Validators.required, Validators.minLength(6)]],
               
                },
                 );
              }
// convenience getter for easy access to form fields
get f() { return this.loginform.controls; }

              login(data)
              {
                  let user= {
                    email:this.loginform.value.email,
                    password:this.loginform.value.password

                  }
                  this.userService.login(user).subscribe(response=>
                    {
                    console.log('response after login',response);
                   // this.router.navigate(['/register'])

                  },
                  
                   
                  error=>
                  {
                  console.log('error msg', error);
                  })
              }
              forgetPassword(data)
              {
                this.router.navigate(['/forgetpassword'])

              }
                onSubmit()
                {
                  this.submitted=true;
                }

}