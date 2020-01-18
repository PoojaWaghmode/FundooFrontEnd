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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    MatCardModule,FlexLayoutModule,ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,MatButtonToggleModule,MatSidenavModule,MatToolbarModule,MatListModule,MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule

    
  ],
  exports:[
    MatCardModule,FlexLayoutModule,ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,MatSidenavModule,MatToolbarModule,MatListModule,MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule

  ],


  providers: []
})
export class MaterialModule { }