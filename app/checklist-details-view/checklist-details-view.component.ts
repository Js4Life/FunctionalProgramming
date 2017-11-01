import { Component, OnInit } from '@angular/core';
import { AppRouteConfig } from '../app.router-config';
import { ClientState } from '../providers/clientstate.provider';
import { ChecklistSvc } from '../services/checklist/checklist.service';


@Component({
  selector: 'checklist-details-view',
  templateUrl: './checklist-details-view.component.html',
  styleUrls: ['./checklist-details-view.component.css']
})
export class ChecklistDetailsViewComponent implements OnInit {

  requirementsList:any=[];
  currentRequirement:any;
  referenceList:any=[];
  counter:any=[1,2,3];
  currentReqIdx:any;
  checklist:any;

  constructor(private arc:AppRouteConfig, private clientstate:ClientState, private checklistSvc: ChecklistSvc) { }

  gotoPrevious(){
    this.arc.goback();
  }

  addRequirement(len){
    this.requirementsList.push({id:len+1,title:'',text:'',implementation:''});
  }

  onTabClick(idx,e){
    if(e)
      $(e.currentTarget).addClass('activeTab').siblings().removeClass('activeTab').addClass('inactiveTab');
    this.currentReqIdx = idx;
    this.showRequirement(this.currentReqIdx);
  }
  showRequirement(idx){
    this.currentRequirement = this.requirementsList[idx];
  }

  ngOnInit() {
    this.checklistSvc.getChecklistById(this.clientstate.currentChecklistId).then(data=>{
      this.checklist = data;
    })
    if(this.requirementsList.length==0)
      this.requirementsList.push({id:1,title:'',text:'',implementation:''});

    this.onTabClick(0,null);
  }

}
