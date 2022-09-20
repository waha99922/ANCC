import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  readData:any = [];

  ngOnInit(): void {
    this.service.getAllData().subscribe((res)=>{
      console.log(res, "res=>");
      this.readData = res;
    })
  }

  //delete id
  DeleteId(id:any){
    console.log(id,"deleteid=>");
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res, "deleteid=>");

      this.service.getAllData().subscribe((res)=>{
        console.log(res, "res=>");
        this.readData = res;
      })

    })
  }
  
}