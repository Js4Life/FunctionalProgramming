import { Component, OnInit } from '@angular/core';
import { AppRouteConfig } from '../app.router-config';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { UserSvc } from '../services/user/user.service';
import { AnalysisService } from '../services/analysis/analysis.service';
import { NewChecklistRequestVM } from '../models/newchecklistrequest.model';
import { ClientState } from '../providers/clientstate.provider';

  import * as _ from 'underscore';


@Component({
  selector: 'new-checklist',
  templateUrl: './new-checklist.component.html',
  styleUrls: ['./new-checklist.component.css']
})
export class NewChecklistComponent implements OnInit {

  checklist:NewChecklistRequestVM = new NewChecklistRequestVM;
  userList:any=[];
  msg:string;
  constructor(@Inject(DOCUMENT) private document: any, private arc:AppRouteConfig, private userSvc:UserSvc,
    private analysisSvc:AnalysisService, private clientState:ClientState) { }

  selectUser(user){
    user.isSelected=!user.isSelected;
    if(!this.checklist.users){
      this.checklist.users=[];
      this.checklist.users.push(user.id);
    }
    else {
      if(_.contains(this.checklist.users,user.id)){
        this.checklist.users = _.reject(this.checklist.users,function(id){ return id == user.id; });
      }
      else{
        this.checklist.users.push(user.id);
      }
    }
  }

  getAllUsers(){
    this.userSvc.getAllUsers().then(data=>{
      this.userList = data;
      this.userList.forEach(obj=>{
        obj.isSelected=false;
      })
    })
  }

  createChecklist(){
    this.analysisSvc.createChecklist(this.clientState.lastAnalysisId,this.checklist).then(data=>{
      if(data){
        console.log(data);
        this.checklist = new NewChecklistRequestVM;
        // alert("checklist "+data+" created" );
      }
    })
    this.msg="checklist created";
    setTimeout(()=>{ this.msg = "" }, 4000);
  }
  ngOnInit() {
    this.getAllUsers();
  }
}
