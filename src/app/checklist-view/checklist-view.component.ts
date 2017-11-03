import { Component, OnInit } from '@angular/core';
import { AppRouteConfig} from '../app.router-config';
import { ClientState } from '../providers/clientstate.provider';
import { UserSvc } from '../services/user/user.service';
import { Constants , HttpVerbs} from '../models/constants.model';

declare var $:any;
import * as _ from 'underscore';


@Component({
  selector: 'checklist-view',
  templateUrl: './checklist-view.component.html',
  styleUrls: ['./checklist-view.component.css']
})
export class ChecklistViewComponent implements OnInit {

  checklists:any = [];
  checklistsTemp:any;
  currUser:any;

  constructor(private arc:AppRouteConfig, private clientstate:ClientState, private userSvc:UserSvc) { }


  gotodetails(chk){
    this.clientstate.currentChecklistId = chk.id;
    this.arc.gotoChecklistDetails(chk.id);
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
    this.currUser = JSON.parse(localStorage.getItem(Constants.LOGIN_RESPONSE));
  }
  

}
