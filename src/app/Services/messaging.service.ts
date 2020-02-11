import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { UserServiceService } from './UserService/user-service.service';
import { MatSnackBar } from '@angular/material';
import { NotesService } from './NotesService/notes.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage=new BehaviorSubject(null);

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private userService:UserServiceService,
    private snackBar:MatSnackBar,
    private noteService:NotesService
    ) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  updateToken(userId, token)
   {
   
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

                            
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe((token) => {
        console.log(" FireBase Token :",token)

        let data=
               {
                    FcmToken:token
               }
               

        this.userService.storeFCMToken(data).subscribe(response=>{

          console.log("Response:",response['data']);
          
          this.snackBar.open(response['message'],'',
          {
            duration:2000,
            verticalPosition: 'top',
            horizontalPosition:'center'
          });

        })

      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

 
  receiveMessage() 
  {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
     
      })
      
      this.noteService.currentTimeReminderNotesData().subscribe((response)=>{
        console.log("Triggered",response);
      
      })
     
     
      
  }

}
