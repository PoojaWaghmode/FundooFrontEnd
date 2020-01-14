import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import{MatToolbarModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    MatCardModule,FlexLayoutModule,ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,MatButtonToggleModule,MatSidenavModule,MatToolbarModule,MatListModule

    
  ],
  exports:[
    MatCardModule,FlexLayoutModule,ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,MatSidenavModule,MatToolbarModule,MatListModule

  ],


  providers: []
})
export class MaterialModule { }