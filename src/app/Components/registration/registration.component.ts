import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AdminService } from 'src/app/Service/Admin/admin.service';

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
              private snackBar:MatSnackBar,
              private adminService:AdminService) { }
 hide=true

ngOnInit() {
                this.registrationform=this.formBuilder.group({
                firstName: ['', [Validators.required,Validators.minLength(3)]],
                lastName:['',[Validators.required,Validators.minLength(3)]],
                email:['',[Validators.required,Validators.email]],
                userName:['',[Validators.required]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required,]],
                ServiceType : ['',Validators.required]
                
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
      ServiceType:this.registrationform.value.ServiceType, 
      UserType:"User",
        }

        if(this.registrationform.status=='VALID')
        {
          this.adminService.register(newUser).subscribe(response=>
            {
              console.log('response after registration', response); 
                  
              this.router.navigate(['/login']);
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
             else{
               console.log("All Fields Are Required");
               this.snackBar.open(['error']['Message'],'All Fields Are Required');
           
            }
  }
}
