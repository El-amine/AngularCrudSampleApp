import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private dialog: MatDialog, private api: ApiService) {}
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','comment','action(s)'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllproducts();
  }
  title = 'WELCOME TO KADER ANGULAR DEMO !!';
  length = 100;
  b = 5;
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
      // data: {
      //   animal: 'panda',
      // },
    }).afterClosed().subscribe(val=>{
      if(val==="save")
      this.getAllproducts();
    });
  }
  getAllproducts() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
        },
        error: (err) => {
          alert("Error while fetching products")
        }
      })
  }
editProduct(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row    
  }
    ).afterClosed().subscribe(val=>{      
      if(val==="update")
      this.getAllproducts();
    })
}
deleteProduct(id:number){
  this.api.deleteProduct(id)
  .subscribe({
    next: (res) => {
      alert("product deleted successfully");
      this.getAllproducts();
    },
    error: (err) => {
      alert("Error while deleting the product!!\n\n Message: "+err.Message)
    }
  });
  // this.dialog.open(DialogComponent,{
  //   width:'30%',
  //   data:row.id
        
  // }
  //   ).afterClosed().subscribe(val=>{
      
  //     if(val==="delete")
  //     this.getAllproducts();
  //   })
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

