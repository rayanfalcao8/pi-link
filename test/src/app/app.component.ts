import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'id_number', 'issued_on', 'issued_at', 'residence', 'email', 'phone_number', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog : MatDialog, private api : ApiService) {

  }
  ngOnInit(): void {
    this.getAllClients();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val == 'save') {
        this.getAllClients();
      }
    });
  }

  getAllClients() {
    this.api.getClients()
    .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.client);
      });
  }

  deleteClient(id: number) {
    this.api.deleteClient(id)
    .subscribe({
      next: (res) => {
        this.getAllClients();
      },
      error: () => {
        alert("Error While Deleting the Record");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sendMail(row: any){
    this.api.sendMail(row.id)
    .subscribe((res) => {
        this.getAllClients();
      });

  }

}
