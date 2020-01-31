import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LabelService } from 'src/app/Services/LabelService/label.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss']
})
export class EditLabelsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditLabelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private labelService:LabelService,
    private snackBar:MatSnackBar,
    private dataService:DataServiceService
  ) { this.labels = data}

  labels = [];
  visible=false;
  ngOnInit() {  }
  labelName=''
  
  CreateLabel()
  {
    if(this.data.labelName!=null)
    {
          let label={

                Label:this.data.labelName                     
            }
            this.labelService.createLabel(label).subscribe(response=>
              {
                      console.log('response after create label',response);

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
      else
      {
        console.error(" Field Required");
      }
    }
}


