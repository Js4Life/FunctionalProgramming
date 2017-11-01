import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../models/constants.model';
import { MasterDataSvc } from '../services/masterdata/masterdata.service';
import { DocumentSvc } from '../services/document/document.service';

   
import { AppRouteConfig} from '../app.router-config';
import { ClientState } from '../providers/clientstate.provider';
import { UtilsService } from '../services/utils.service';


declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public showStyle: boolean = false;

  sub:any;
  username:any;
  parentFiles:any=[];


  navOptions:any=[
    {id:'home', name:'Home'},
    {id:'checklist', name:'Checklists'}
  ]
  constructor(private route: ActivatedRoute,public router : Router, public arc:AppRouteConfig,private clientState:ClientState,
   private masterDataSvc:MasterDataSvc,private utilsService:UtilsService, private documentSvc:DocumentSvc) { }

  onNavClick(opt,e){
    if(e)
      $(e.currentTarget).addClass('active').siblings().removeClass('active');
    else
      $('#'+opt.id).addClass('active').siblings().removeClass('active');
    $('#regulations').find('.active').removeClass('active');
    switch(opt.id){
      case 'checklist':
          this.arc.toChecklists();
          break;
      case 'home':
          this.arc.toHome();
          break;
    }
  }

  selectRegulation(item,e){
    if(e){
      $('#generalOptions').find('.active').removeClass('active');
      $(e.currentTarget).addClass('active').siblings().removeClass('active');
    }

    this.clientState.selectedRegulation=item;
    this.arc.toFileExplorer(Math.random());

  }

  getRegulationTypes(){
    // this.masterDataSvc.getAllRegulations().then(data=>{
    this.documentSvc.getTopLevelFolders().then(data=>{
      this.parentFiles=data;
      console.log(this.parentFiles);
    })
  }
  
  getAllContexts(){
    this.masterDataSvc.getAllContexts().then(data=>{
      this.clientState.allContexts=this.utilsService.mapContextColor(data);      
    })
  }

  onIntialise(){
    this.getRegulationTypes();
    this.getAllContexts();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       var role = params['role'];
       if(localStorage[Constants.LOGIN_RESPONSE] && localStorage[Constants.LOGIN_RESPONSE]!="undefined"){
         var user=JSON.parse(localStorage[Constants.LOGIN_RESPONSE]);
         this.username=user.userName;
       }
    });
    this.onIntialise();
  }
  ngAfterViewInit() {
    var prev = this.clientState.CURRENT_STATE;
    if(prev && prev.includes('checklist')){
      this.onNavClick(this.navOptions[1],null);
    }
    else{
      this.onNavClick(this.navOptions[0],null);
    }
  }

}
