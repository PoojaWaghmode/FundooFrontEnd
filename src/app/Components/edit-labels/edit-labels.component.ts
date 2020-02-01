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
  ) { this.labelArray = data}

  
  labelArray = [];
  visible=false;
  ngOnInit() { 
    this.dialogRef.updateSize('25%','50%');
   }
  label=''
  
  CreateLabel()
  {
    //console.log("Data Labelcdvf",this.labels);
    if(this.label)
    {
     
      let labelInfo =
      {
        labelName : this.label
      } 

      this.labelArray.push(labelInfo);
     
            this.labelService.createLabel(labelInfo).subscribe(response=>
              {
                      console.log('response after create label',response);

                      this.snackBar.open(response['message'],'',{
                        duration:2000,
                        verticalPosition: 'top',
                        horizontalPosition:'center'
                      });

                      this.dataService.changeMessage(
                        {
                          type : 'GetLabels'
                        }
                      )

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
                      this.label=''
      }
      else
      {
        console.error(" Field Required");
      }
    }

    DeleteLabel(label)
    {
      
      var find = this.labelArray.find(function(item){return item.label === label.labelName});
      var index = this.labelArray.indexOf(find);
      this.labelArray.splice(index);
      this.labelService.deleteLabel(label.id).subscribe(response=>
        {
          console.log("After Delete Label",response);
          this.snackBar.open(response['message'],'',{
            duration:2000,
            verticalPosition: 'top',
            horizontalPosition:'center'
          });

          this.dataService.changeMessage(
            {
              type : 'GetLabels'
            }
          )

      })

    }
    EditLabel(label)
    {
      let labelInfo={
      
        labelName : label.labelName
      }
      this.labelService.editLabel(label.id, labelInfo).subscribe(response=>
      {
          this.snackBar.open(response['message'],'',{
            duration:2000,
            verticalPosition: 'top',
            horizontalPosition:'center'

          });
          this.dataService.changeMessage(
            {
              type : 'GetLabels'
            }
          )
      })
    }
}


