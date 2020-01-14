import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {UserServiceService} from '../../Services/UserService/user-service.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationform:FormGroup
  submitted=false;

  constructor(
              private formBuilder:FormBuilder,
              private router:Router,
              private userService:UserServiceService) { }
 hide=true

ngOnInit() {
                this.registrationform=this.formBuilder.group({
                firstName: ['', [Validators.required,Validators.minLength(3)]],
                lastName:['',[Validators.required,Validators.minLength(3)]],
                email:['',[Validators.required,Validators.email]],
                userName:['',[Validators.required]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required,]]
                
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
    });
    
  }
   

MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) 
        {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) 
        {
            matchingControl.setErrors({ mustMatch: true });
        } 
        else
        {
            matchingControl.setErrors(null);
        }
    }
}

  register(value){
    
    let newUser={
      FirstName:this.registrationform.value.firstName,
      LastName:this.registrationform.value.lastName,
      Email:this.registrationform.value.email,
      userName:this.registrationform.value.userName,
      Password:this.registrationform.value.password,
      
      UserType:"User",
      //ServiceType:"Basic",
    
      
        }

    //console.log('registration', this.registrationform.value);
          this.userService.register(newUser).subscribe(response=>
            {
              console.log('response after registration', response); 
                  
              this.router.navigate(['/login']);
            },
            error=>
            {
              console.log('error msg', error);
            })

  }
}
  
     
  


  

