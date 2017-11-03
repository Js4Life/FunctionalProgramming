import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../services/analysis/analysis.service';
import {AnalysisResponseVM} from "../models/analysisresponse.model";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //hasAnalysisHistory:boolean=true;
  recentAnalysis:AnalysisResponseVM[]=[];

  constructor(private analysisSvc:AnalysisService) { }

  ngOnInit() {
    this.onInitialise();
  }

    onInitialise(){
    //return this.baseService.invokeService(this._url,'',1);
    this.analysisSvc.getAllAnalysis().then(data=>{
      console.log(data);
      this.recentAnalysis= data;

    })

  }

}
