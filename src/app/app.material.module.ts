import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  imports: [ MatCardModule,
    MatFormFieldModule,
     MatInputModule,
     MatIconModule,
     MatSnackBarModule,MatMenuModule,MatToolbarModule,MatDividerModule,MatSidenavModule,MatListModule,MatGridListModule,MatTableModule
   

    
  ],
  exports:[MatCardModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,MatButtonToggleModule,MatMenuModule,MatToolbarModule,MatDividerModule,MatSidenavModule,MatListModule,MatGridListModule,MatTableModule
    
    

  ],


  providers: []
})
export class MaterialModule { }