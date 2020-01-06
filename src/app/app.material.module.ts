import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
// import {MatFormFieldModule,} from '@angular/material/form-field';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    MatCardModule,FlexLayoutModule,ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule

  ],
  exports:[
    MatCardModule,FlexLayoutModule,ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule

  ],


  providers: []
})
export class MaterialModule { }