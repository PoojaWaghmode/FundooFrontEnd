import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { MaterialModule } from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NotesComponent } from './Components/notes/notes.component';
import { RemindersComponent } from './Components/reminders/reminders.component';
import { EditLabelsComponent } from './Components/edit-labels/edit-labels.component';
import { ArchiveComponent } from './Components/archive/archive.component';
import { TrashComponent } from './Components/trash/trash.component';
import { AddNoteComponent } from './Components/add-note/add-note.component';
import { DisplayNotesComponent } from './Components/display-notes/display-notes.component';
import { IconsComponent } from './Components/icons/icons.component'; 
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { EditNoteComponent } from './Components/edit-note/edit-note.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SearchComponent } from './Components/search/search.component';
import { LabelComponent } from './Components/label/label.component';
import { CollaboratorComponent } from './Components/collaborator/collaborator.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent, 
    DashboardComponent,
    NotesComponent,
    RemindersComponent,
    EditLabelsComponent,
    ArchiveComponent,
    TrashComponent,
    AddNoteComponent,
    DisplayNotesComponent,
    IconsComponent,
    EditNoteComponent,
    SearchComponent,
    LabelComponent,
    CollaboratorComponent,
    
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MaterialModule,
    BrowserAnimationsModule,  
    HttpClientModule,
    RouterModule, 
    FlexLayoutModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,

  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent],
  // entryComponents: [
  //  SampleComponent
  // ],
 
})
export class AppModule { }
