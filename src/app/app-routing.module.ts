import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import {RegistrationComponent} from './Components/registration/registration.component';
import {ForgetPasswordComponent} from './Components/forget-password/forget-password.component';
import {ResetPasswordComponent}from './Components/reset-password/reset-password.component';
import{DashboardComponent} from './Components/dashboard/dashboard.component';
import{NotesComponent}from './Components/notes/notes.component'
import { DisplayNotesComponent } from './Components/display-notes/display-notes.component';
import {AddNoteComponent}from './Components/add-note/add-note.component';
import { ArchiveComponent } from './Components/archive/archive.component';
import { TrashComponent } from './Components/trash/trash.component';
import { RemindersComponent } from './Components/reminders/reminders.component';
import { EditNoteComponent } from './Components/edit-note/edit-note.component';
import { SearchComponent } from './Components/search/search.component';
import { CollaboratorComponent } from './Components/collaborator/collaborator.component';
import { EditLabelsComponent } from './Components/edit-labels/edit-labels.component';

const routes: Routes = [
  { path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{ path: 'login', component: LoginComponent },
{path:'register',component :RegistrationComponent},
{path:'forgetpassword',component:ForgetPasswordComponent},
{path:'resetpassword/:token',component:ResetPasswordComponent},

{path:'dashboard',component:DashboardComponent ,
children:[

        { path: '',redirectTo: 'notes', pathMatch: 'full'},
        { path: 'notes',component: NotesComponent },
        { path:  'addNote',component:AddNoteComponent},
        { path:  'display',component:DisplayNotesComponent},
        { path: 'archive',component:ArchiveComponent},
        { path: 'trash',component:TrashComponent},
        { path: 'reminder',component:RemindersComponent},
        { path: 'edit-note',component:EditNoteComponent},
        { path: 'search',component:SearchComponent},
        { path: 'collaborator',component:CollaboratorComponent},
        { path: 'edit-labels',component:EditLabelsComponent},
      
   
    ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
