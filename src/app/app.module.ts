import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/';

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
    IconsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatFormFieldModule,MaterialModule,
    BrowserAnimationsModule,  HttpClientModule,RouterModule, FlexLayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
