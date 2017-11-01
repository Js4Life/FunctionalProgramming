import { Component, OnInit } from '@angular/core';
import { AppRouteConfig} from '../app.router-config';
import { ClientState } from '../providers/clientstate.provider';
import { UserSvc } from '../services/user/user.service';


declare var $:any;
import * as _ from 'underscore';


@Component({
  selector: 'checklist-view',
  templateUrl: './checklist-view.component.html',
  styleUrls: ['./checklist-view.component.css']
})
export class ChecklistViewComponent implements OnInit {

  checklists:any = [
    {name:'Credit Risk Assessment Aggregration', contexts:['Segmentation','LifeOfLoan'],regulations:['FASB'],collaborators:['ABC','WXY'],
    createdBy:'ABC',createdDate:'Sept 23, 7:15 pm',modifiedBy:'XYZ',modifiedDate:'Sept 27, 7:15 pm', status:0},
    {name:'Borrower Counterparty Aggregration', contexts:['Segmentation','LifeOfLoan'],regulations:['FASB'],collaborators:['ABC','WXY'],
    createdBy:'ABC',createdDate:'Sept 23, 7:15 pm',modifiedBy:'XYZ',modifiedDate:'Sept 27, 7:15 pm', status:1},
    {name:'Credit Aggregration', contexts:['Segmentation','LifeOfLoan'],regulations:['FASB'],collaborators:['ABC','WXY'],
    createdBy:'ABC',createdDate:'Sept 23, 7:15 pm',modifiedBy:'XYZ',modifiedDate:'Sept 27, 7:15 pm', status:2},
    {name:'Aggregration Checklist', contexts:['Segmentation','LifeOfLoan'],regulations:['FASB'],collaborators:['ABC','WXY'],
    createdBy:'ABC',createdDate:'Sept 23, 7:15 pm',modifiedBy:'XYZ',modifiedDate:'Sept 27, 7:15 pm', status:3}
  ];
  checklistsTemp:any;

  constructor(private arc:AppRouteConfig, private clientstate:ClientState, private userSvc:UserSvc) { }


  gotodetails(chk){
    this.clientstate.currentChecklistId = chk.id;
    this.arc.gotoChecklistDetails();
  }
  searchFocusIn(){
    $('.searchChecklistBtn').addClass('searchChecklistFocus').removeClass('searchChecklistBtn');
  }
  searchFocusOut(){
    $('.searchChecklistFocus').addClass('searchChecklistBtn').removeClass('searchChecklistFocus');
  }
  onSearch(searchStr){
    if(searchStr.length>2)
    this.checklistsTemp = _.filter(this.checklists, function(obj) { 
      if(obj.name.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0){
        return obj;
      }
    });
    if(searchStr.length==0){
      this.checklistsTemp = Object.assign([], this.checklists);
    }
  }

  ngOnInit() {
    this.userSvc.getChecklistByUserId().then(data=>{
      this.checklists = data;
      this.checklistsTemp = Object.assign([], this.checklists);
    })
  }
  

}
