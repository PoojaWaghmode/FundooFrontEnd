import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../../Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup
  submitted=false;
  


  constructor(private matcard: MatCardModule,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserServiceService,
    private snackBar:MatSnackBar) { }

    hide=true;


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

    let user= 
    {
      Password:this.resetPasswordForm.value.password,
      Token:token
    }
    console.log('in functon');
    console.log(user);
    
    this.userService.resetPassword(user).subscribe(response=>
    {
      console.log('response after Resetpassword',response);
      this.router.navigate(['/login'])
      this.snackBar.open(response['message'],'',
      {
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
  
      // convenience getter for easy access to form fields
    get f() { return this.resetPasswordForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.resetPasswordForm.value))
    }

}
