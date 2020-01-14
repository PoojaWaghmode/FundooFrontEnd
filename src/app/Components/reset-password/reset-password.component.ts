import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../../Services/UserService/user-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup
  //submitted=false;

  constructor(private matcard: MatCardModule,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserServiceService) { }

    hide=true

  ngOnInit() {
    this.resetPasswordForm=this.formBuilder.group
                   ({
                     
                     password:['',[Validators.required,Validators.minLength(6)]],
                     token:['',Validators.required]

                    },
            );
  }
  resetPassword(data)
  {
    const token=this.route.snapshot.paramMap.get('token');

    let user= {
      Password:this.resetPasswordForm.value.password,
      Token:token
    }
    console.log('in functon');
    console.log(user);
    
    this.userService.resetPassword(user).subscribe(response=>
      {
      console.log('response after Resetpassword',response);
      this.router.navigate(['/login'])

    },
    error=>
    {
    console.log('error msg', error);
    })
  }
  

}
