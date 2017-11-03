import { Component, OnInit } from '@angular/core';
import { AppRouteConfig } from '../app.router-config';
import { ActivatedRoute } from '@angular/router';

import { checklistItemVM} from '../models/checklistItem.model';

import { ClientState } from '../providers/clientstate.provider';
import { ChecklistSvc } from '../services/checklist/checklist.service';
import {UserSvc } from '../services/user/user.service';

import * as _ from 'underscore';

declare var CKEDITOR : any;

@Component({
  selector: 'checklist-details-view',
  templateUrl: './checklist-details-view.component.html',
  styleUrls: ['./checklist-details-view.component.css']
})
export class ChecklistDetailsViewComponent implements OnInit {

  sub :any;
  showItem:boolean=true;
  statusList:any = ['NEW','INPROGRESS','PENDING','APPROVED'];
  statusListOpen:boolean=false;
  userListOpen:boolean = false;
  userList:any;
  selectedUserList:any=[];
  checklistItemList:Array<checklistItemVM>=[];
  currentRequirement:any;
  referenceList:any=[];
  counter:any=[1,2,3];
  currentReqIdx:any;
  checklist:any;
  linkedAnalysisId:any;
  savedmsg:string;
  unsavedmsg:string;

  constructor(private arc:AppRouteConfig, private route: ActivatedRoute, private clientstate:ClientState,
   private checklistSvc: ChecklistSvc, private userSvc:UserSvc) { }

  gotoPrevious(){
    this.arc.goback();
  }

  getInitial(name){
    return name.substring(0,2).toUpperCase();
  }

  addRequirement(len){
    var checklistItemObj = new checklistItemVM();
    this.checklistItemList.push(checklistItemObj);
  }

  changeStatus(idx,status){
    this.checklistItemList[this.currentReqIdx].itemStatus = status;
    this.statusListOpen=false;
  }

  onTabClick(idx,e){
    this.showItem = false;
    if(e)
      $(e.currentTarget).addClass('activeTab').siblings().removeClass('activeTab').addClass('inactiveTab');
    this.currentReqIdx = idx;
    this.showItem = true;
    CKEDITOR.instances['editor1'].setData(this.checklistItemList[this.currentReqIdx].requirementDetails);
    CKEDITOR.instances['editor2'].setData(this.checklistItemList[this.currentReqIdx].implementationSteps);
  }

  saveEmitter(emittedData){
    if(emittedData.type=="requirement")
      this.checklistItemList[this.currentReqIdx].requirementDetails=emittedData.data;
    if(emittedData.type=="implementation")
      this.checklistItemList[this.currentReqIdx].implementationSteps=emittedData.data;
  }

  saveChecklistItem(checklistItem){
    if(checklistItem != undefined && checklistItem.id == undefined ){
      this.checklistSvc.saveChecklistItem(this.clientstate.currentChecklistId, checklistItem).then(data=>{
        console.log(data);
        this.linkedAnalysisId=data.linkedAnalysisId;
      })
    }else{
      let x: any = _.findWhere(this.selectedUserList,{ isSelected:true });
      if( x )
        checklistItem.assigneeId = x.id;
      
      this.checklistSvc.updateChecklistItem(this.clientstate.currentChecklistId, checklistItem).then(data=>{
        console.log(data);
        this.linkedAnalysisId=data.linkedAnalysisId;
      })
      console.log(this.linkedAnalysisId);
    }
    this.savedmsg="Checklist Saved";
    setTimeout(()=>{ this.savedmsg = "" }, 4000);
  }

  openInAnalysis(checklistItem){
    if(this.linkedAnalysisId)
      this.arc.gotoSelectedStates(this.linkedAnalysisId);
    else{
      this.unsavedmsg="save item first";
      setTimeout(()=>{ this.unsavedmsg = "" }, 4000);
    }
      // alert('save item first');
  }

  getChecklistById(id){
    this.checklistSvc.getChecklistById(this.clientstate.currentChecklistId).then(data=>{
      this.checklist = data;
      this.checklistItemList = data.checkListItems;
    })
  }
  getAllUsers(){
    this.userSvc.getAllUsers().then(data=>{
      this.userList = data;
      this.userList.forEach(obj=>{
        obj.isSelected=false;
      })
    })
  }
  changeUserAssignment(index, user){
    if(this.selectedUserList.length==0){
      this.userList[index].isSelected=true;
      this.selectedUserList.push(this.userList[index]);
    }
    else{
      user.isSelected = !user.isSelected;
      if(user.isSelected && !(_.findWhere(this.selectedUserList,{ id:user.id }))){
      this.selectedUserList.push(user);
      }
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.clientstate.currentChecklistId = params['id'];
      this.getChecklistById(this.clientstate.currentChecklistId);
    });
    
    if(this.checklistItemList.length==0){
      var checklistItemObj = new checklistItemVM();
      this.checklistItemList.push(checklistItemObj);
    }

    this.onTabClick(0,null);
    this.getAllUsers();
  }

}
