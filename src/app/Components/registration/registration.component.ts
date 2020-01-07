import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationform:FormGroup
  submitted=false;

  constructor(private matcard : MatCardModule,
    private formBuilder:FormBuilder) { }
 

  ngOnInit() {
                this.registrationform=this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName:['',Validators.required],
                userName:['',Validators.required],
                Email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', Validators.required]
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
    });
    
  }
   // convenience getter for easy access to form fields
   get f() { return this.registrationform.controls; }
  


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  register(data){
    console.log(" data in ",);
    
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationform.invalid)
     {
          return;
     }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationform.value))
    }
}
