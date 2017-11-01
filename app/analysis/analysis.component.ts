import { Component, OnInit, Input} from '@angular/core';
import * as _ from 'underscore';
import { Http } from "@angular/http";
import { AppRouteConfig} from '../app.router-config';

import { BaseHttpService } from "../services/base-http.service";
import { environment } from "../../environments/environment";

import { AnalysisService } from '../services/analysis/analysis.service';
import {AnalysisResponseVM} from "../models/analysisresponse.model";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})

export class AnalysisComponent implements OnInit  {
 
  @Input() recentAnalysis : AnalysisResponseVM[];
  filedata:any = [];
  allFiles :boolean=true;
  MarkedFiles :boolean=false;
  hoverBtns:any=[];
  private _url:string = environment.BASE_URL1;

  analysisList : Array<AnalysisResponseVM>;
  constructor(private arc:AppRouteConfig,   private analysisSvc:AnalysisService) {
     }

  onInitialise(){
    //return this.baseService.invokeService(this._url,'',1);
    this.analysisSvc.getAllAnalysis().then(data=>{
      console.log('analysis data : ');
      console.log(data);
      this.recentAnalysis= data;
      this.filedata = this.recentAnalysis;

    })

  }

  hoverItem(item){
    if(item.mark){
      this.hoverBtns=[{name:'Delete'},{name:'Rename'},{name:'Unmark'}];
    }
    else{
      this.hoverBtns=[{name:'Delete'},{name:'Rename'},{name:'Mark'}];
    }
  }
 
  ngOnInit(){
    // this.getList().then( data => {
    //   this.newfiledata = this.filedata= data  
    // })
    this.onInitialise();
   }

  onsearch(value){
    this.recentAnalysis = _.filter(this.filedata, function(obj) { 
      if(obj.name.toLowerCase().indexOf(value.toLowerCase()) >= 0){
        return obj;
      }
      if(obj.id.toLowerCase().indexOf(value.toLowerCase()) >= 0){
        return obj;
      }
    });
    if(this.filedata.length == 0) {
      this.filedata = this.filedata;
    }
  }

  onClickBtn(analysisId,btnName,e){
    e.stopPropagation();
     console.log('analysis : ' + analysisId + " " + btnName);
    switch(btnName){
      case 'Mark':
      // console.log('mark : ');
        break;
      case 'Unmark':
        break;
      case 'Rename':
        break;
      case 'Delete':
      console.log('Delete Analysis : ' + analysisId + " " + btnName);
      this.analysisSvc.deleteAnalysisById(analysisId).then(data=>{
        console.log('response from deleted analysis : ');
        console.log(data);
        this.onInitialise();        
      })  
      // this.recentAnalysis.splice(analysisId,1);
        break;
    }
  }

  onMark() {
    this.recentAnalysis = _.filter(this.filedata,function(obj){
      if(obj.mark == true){
        return obj;
      }
    })
  }

  all(opt,e){
    $(e.currentTarget).removeClass('Marked').addClass('All').siblings().removeClass('All').addClass('Marked');
    if(opt=='all'){
      this.recentAnalysis = this.filedata;
    }
    else{
      this.onMark();
    }
  }

  goToSavedAnalysis(analysisData){
    console.log(analysisData);
    this.arc.gotoSelectedStates(analysisData.id);
  }
}
