import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn: string = 'Save';

  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : ['', Validators.required],
      surname : ['', Validators.required],
      id_number : ['', Validators.required],
      issued_at : ['', Validators.required],
      issued_on : ['', Validators.required],
      residence : ['', Validators.required],
      phone_number : ['', Validators.required],
      email : ['', Validators.required],
    });

  }

  addClient() {
    if(!this.editData) {
      if(this.productForm.valid) {
        this.api.postClient(this.productForm.value)
        .subscribe((res) => {
            alert("Client Added Successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          });
      }
    } else {
      this.updateClient()
    }
  }

  updateClient() {
    this.api.putClient(this.productForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Client Updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error While Updating the Client");
      }
    })
  }

}
