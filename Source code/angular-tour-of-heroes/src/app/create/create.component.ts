import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: ActivatedRoute, private _location: Location) { }

  getparamid:any;

  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,"res=>")
        this.userForm.patchValue({
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile
        })
      })
    }
    
  }

  userForm = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    mobile : new FormControl('', Validators.required)
  })

  //update user
  userUpdate(){
    console.log(this.userForm.value,'updatedform');
    if(this.userForm.valid){
      this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
        console.log(res,"resupdated");
        alert("User Updated")
      })
    }else{
      console.log("all fields should be filled");
    }
  }

  //create new user
  userSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log(res, "res=>");
        alert("New User Added")
        this.userForm.reset();
      })
    }
    else{
      console.log("all fields should be filled")
    }
  }

  //go back button
  goBack(){
    this._location.back();
  }

}
