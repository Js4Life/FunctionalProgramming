import { Component, OnInit,ElementRef, NgZone, ViewChild, ViewEncapsulation,Injectable} from '@angular/core';
import { Router} from '@angular/router';

import {Constants} from './models/constants.model';
import { ClientState } from './providers/clientstate.provider';


// import { Overlay, overlayConfigFactory } from 'angular2-modal';
// import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AppRouteConfig implements OnInit {

  constructor(public router : Router, private clientState: ClientState){

  }

  gotoPage(state){
    this.clientState.CURRENT_STATE = this.router.url;
    this.router.navigate(['./'+state]);
  }
  goback(){
    var prev = this.clientState.CURRENT_STATE;
    this.router.navigate(['./'+prev]);
  }
  toFileExplorer(fileId){
    this.gotoPage('dashboard/file-explorer/'+fileId);
  }
  toHome(){
    this.gotoPage('dashboard/home');
  }
  toChecklists(){
    this.gotoPage('dashboard/checklist');
  }
  gotoSelectedStates(analysisId){
    // this.gotoPage('state-selections/'+dataString);
    this.gotoPage('paragraph-explorer/'+analysisId);
  }
  gotoChecklistDetails(){
    this.gotoPage('checklist-details');
  }

  ngOnInit() {
  }
}