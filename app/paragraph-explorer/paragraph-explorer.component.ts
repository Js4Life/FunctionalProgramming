import { Component, OnInit } from '@angular/core';
import { AppRouteConfig} from '../app.router-config';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { AnalysisService } from '../services/analysis/analysis.service';
import { DocumentSvc } from '../services/document/document.service';
import { DomSanitizer } from '@angular/platform-browser';


import { ClientState } from '../providers/clientstate.provider';
import { AnalysisRequestVM } from '../models/analysisrequest.model';

import * as _ from 'underscore';
declare var $:any;

@Component({
  selector: 'paragraph-explorer',
  templateUrl: './paragraph-explorer.component.html',
  styleUrls: ['./paragraph-explorer.component.css']
})
export class ParagraphExplorerComponent implements OnInit {

  showOnHover:boolean=false;
  open:boolean=false;
  startChecklist:boolean = false;
  paraOpen:boolean=false;
  paraView:boolean=true;
  stateSaved:boolean=false;
  showHoverContext:boolean=false;
  showfilesDroplist:boolean=false;
  annotations:boolean=true;

  // selections:any={};
  sub:any;
  allContextsByDoc:any;
  selectedContexts:any;
  files:any;
  filesForAnalysis:any=[];
  unselectedContextsLength:number;
  activeContextLength:number=0;
  firstSelectedFile:any;

  selectedParadetails:any;
  tmp_selectedParadetails:any;
  selectedRelatedPara:any=null;
  paragraphArray:any=[];
  paragraphTempArray:any = [];
  selectedParaContext:any;
  analysisModel:AnalysisRequestVM = new AnalysisRequestVM();
  tempAnalysisId:any;
  finalSelections:any={};
  
  paraList:any=[];
  currParaSearchStrLen: number =0;
//<<<<<<< HEAD
  wordsList=[{'word':'General','color':'green'},{'word':'Concepts','color':'red'},{'word':'Paragraph','color':'blue'}];
  loading : boolean = false;
//=======
  
//>>>>>>> c8a8296b916971c558eeec0ed81b2a3d14ccf54c

  constructor(private arc:AppRouteConfig, private route: ActivatedRoute,private clientState:ClientState, private utilSvc:UtilsService,
    private analysisSvc:AnalysisService, private docSvc : DocumentSvc, private sanitizer: DomSanitizer) { }

  back(){
    console.log('inside back');
    this.arc.toHome();
  }
  onTabClick(tab){
    $('#'+tab).removeClass('inactiveTab').addClass('activeTab').siblings().removeClass('activeTab').addClass('inactiveTab');
    switch(tab){
      case "paragraph":
        this.paraView=true;
        break;
      case "document":
        this.paraView=false;
        break;
      }
  }
  onBtnClick(val){
    switch(val){
      case "annotations":
        this.annotations=!this.annotations;
        if(this.annotations){
          this.highlightContextWordsinPara(null);
        }
        else{
          this.tmp_selectedParadetails = Object.assign({},this.selectedParadetails);
        }
        break;
      case "addToChecklist":
        this.paraView=false;
        break;
      }
  }
  leave(){
    this.showOnHover=false;
  }
  showBtns(){
    this.showOnHover=true;
  }
  newChecklist(){
    this.startChecklist = true;
    $('#checklistId').addClass('full').removeClass('close');
  }

  rightbtnClick(opt){
    if(opt=='minimise'){
      $('#checklistId').addClass('close').removeClass('full');
      this.open=true;
    }
    if(opt=='full'){
      $('#checklistId').addClass('full').removeClass('close');
      this.open=false;
    }
    if(opt=='close'){
      $('#checklistId').addClass('close').removeClass('full');
      this.open=false;
      this.startChecklist = false;
    }
  }

  highlightContextWordsinPara(context){
    if(!context){
      context = this.selectedParaContext;
    }
    if(this.annotations){
      this.docSvc.getContributingContextWords(this.selectedParadetails.id).then( data => {
        var reqObj=_.findWhere(data,{contextName : context.contextName});
        // this.wordsList = this.utilSvc.flattenContextWords(data);
        this.wordsList=[];
        var ctxObj = this.clientState.contextColorMap[context.contextName];
        reqObj.words.forEach(word=>{
          this.wordsList.push({'word':word, 'color':ctxObj.color});
        })
        this.tmp_selectedParadetails = Object.assign({},this.selectedParadetails);
        var paraText = this.utilSvc.addHighlightingInfo(this.tmp_selectedParadetails.paraContent,this.wordsList);
        this.tmp_selectedParadetails.paraContent=this.sanitizer.bypassSecurityTrustHtml(paraText);
      });
    }
  }

  clickOnPara(para,e){
    para.relatedParaOpen =false;
    para.showHide = "SHOW";
    $(e.currentTarget).addClass('activePara').removeClass('inactivePara').siblings().removeClass('activePara').addClass('inactivePara');
    this.selectedParadetails  = para;
    this.tmp_selectedParadetails = Object.assign({},this.selectedParadetails);
    // this.highlightContextWordsinPara();
    this.onTabClick('paragraph');

    $(e.currentTarget).find('.progressPane').removeClass('hide').parent().siblings().find('.progressPane').addClass('hide');
    if(!para.relatedParagraphs){
      this.analysisSvc.getRelatedParasInAnAnalysis(this.clientState.lastAnalysisId,para.id).then(data=>{
        console.log(data);
        para.relatedParagraphs = data;
        para.relatedParagraphs.forEach(obj=>{
          obj.contextDistribution = this.utilSvc.updateWeightAndColor(obj.contextDistribution);
        });
      })
    }
  }
  showRelatedParas(para,e){
    $(e.currentTarget).offsetParent().children().find('.relatedParaGroupPanel').collapse("toggle");
    para.relatedParaOpen=!para.relatedParaOpen;
    if(para.showHide == "SHOW")
      para.showHide = "HIDE";
    else
      para.showHide = "SHOW";
    e.stopPropagation();
  }

  clickOnRelatedPara(relPara,e){
    $(e.currentTarget).addClass('activePara').removeClass('inactivePara').siblings().removeClass('activePara').addClass('inactivePara');
    this.selectedRelatedPara=relPara;
    this.onTabClick('paragraph');
  }

  deleteReference(context,idx){
    this.selectedContexts.splice(idx,1);
    var obj=_.findWhere(this.allContextsByDoc,{ contextId:context.contextId });
    obj.isSelected=false;
    this.getRemainingContextDetails();
  }

  changeAddedContext(context){
    this.allContextsByDoc.forEach(obj => {
      if(obj.id == context.id){
        obj.isSelected=context.isSelected;
      }
    });
    this.getRemainingContextDetails();
  }

  paraContextClick(context){
    console.log(context);
    this.selectedParaContext=context;
    this.highlightContextWordsinPara(context);
  }

  contextChange(event){
    if(event.contextName){
      if(event.isSelected) {  //since the boolean status is rendered true if false
        if(_.findWhere(this.selectedContexts,{ id:event.id })){

        }
        else{
          this.selectedContexts.push(event); 
        }
      } 
      if(!event.isSelected)  {
        this.selectedContexts= _.reject(this.selectedContexts, function(obj){
          if(obj.contextName==event.contextName){
            return obj;
          }
        });
      } 
    }
    if(event=='all'){
      this.selectedContexts=this.allContextsByDoc;
    }
    if(event=='none'){
      this.selectedContexts=[];
    }
    this.getRemainingContextDetails();
  }

  collapse(){
    $('#droplist').collapse("toggle");
  }
  
  cancelContextChanges()
  {
    this.showHoverContext=false;
  }
  onFinishAdding(){
    this.showHoverContext=false;
    // console.log('selected contexts length: ' + this.selectedContexts.length);
    // var c=0;
    // var count=0;
    // this.selectedContexts.forEach(obj => {
    //   this.clientState.selectedDocumentsWithContexts.selectedContexts.forEach(obj1 =>{
    //       if(obj.name===obj1.name){
    //           c+=1;
    //       }
    //   });
      
    // });

    // if(this.selectedContexts.length !== this.clientState.selectedDocumentsWithContexts.selectedContexts.length){
    //   count+=1;   
    // }
    // else if(c!=this.selectedContexts.length){
    //   count+=1;  
    // }
    // if(count>0){
      if(this.tempAnalysisId){
        this.analysisSvc.deleteAnalysisById(this.tempAnalysisId).then(data=>{
          console.log(data); 
          this.tempAnalysisId='';       
        })  
      }
      
      this.finalSelections= { filesForAnalysis: this.clientState.selectedFilesForAnalysis, selectedContexts : this.selectedContexts, allContextsByDoc : this.allContextsByDoc };
      this.clientState.selectedDocumentsWithContexts=this.finalSelections;
      var documentRids=[];
      var contextRids=[];
      this.files.forEach(obj=>{
        documentRids.push(obj.id);
      })
      this.selectedContexts.forEach(obj=>{
        contextRids.push(obj.contextId);
      })
      this.analysisModel.docRids = documentRids;
      this.analysisModel.contextRids = contextRids;
      this.analysisModel.name = this.files[0].name;
      console.log(this.analysisModel);
      this.analysisSvc.createNewAnalysis(this.analysisModel).then(data=>{
        this.clientState.lastAnalysisId=this.tempAnalysisId=data.id;
        this.filesForAnalysis=[];
        this.getAnalysisById(this.clientState.lastAnalysisId);
      })
    // }

  }

  getRemainingContextDetails(){
    this.activeContextLength=0;
    if(this.selectedContexts)
      this.unselectedContextsLength=this.allContextsByDoc.length - this.selectedContexts.length;
    else
      this.unselectedContextsLength=this.allContextsByDoc.length;
    this.allContextsByDoc.forEach(obj => {
      if(obj.isSelected){
        this.activeContextLength++;
      }
    });
  }

  changeFileSelection(idx, file){
    if(this.filesForAnalysis.length==0){
      this.files[idx].isSelected=true;
      this.filesForAnalysis.push(this.files[idx]);
    }
    else{
      file.isSelected=!file.isSelected;
      if(file.isSelected && !(_.findWhere(this.filesForAnalysis,{ id:file.id }))){
        this.filesForAnalysis.push(file);
      }
      if(!file.isSelected){
        this.filesForAnalysis=_.reject(this.filesForAnalysis, function(obj){
          if(obj.id==file.id){
            return obj;
          }
        });
      }
    }
    console.log(this.filesForAnalysis);
    this.extractParagraphs();
    // this.firstSelectedFile=this.filesForAnalysis[0];
  }

  extractParagraphs(){
    this.firstSelectedFile=this.filesForAnalysis[0];
    this.paragraphArray = this.firstSelectedFile.paragraphs;
    this.paragraphArray.forEach(para=>{
        para.contextDistribution = this.utilSvc.updateWeightAndColor(para.contextDistribution);
        this.allContextsByDoc.forEach(obj=>{
            var childObj=_.findWhere(para.contextDistribution,{ contextName : obj.contextName });
            if(childObj){
                childObj.isSelected=obj.isSelected;
            }
        })
    })
    //this.paragraphTempArray = jQuery.extend(true,{},this.paragraphArray);
    Object.assign(this.paragraphTempArray,this.paragraphArray)
    console.log(this.paragraphTempArray);
  }

  searchFocusIn(){
    $('.searchBtn').addClass('searchFocus').removeClass('searchBtn');
  }
  searchFocusOut(){
    $('.searchFocus').addClass('searchBtn').removeClass('searchFocus');
  }

  search(searchStr, resultArray){
    
    if(searchStr.length>2){
      if(this.currParaSearchStrLen>=searchStr.length)
        resultArray = this.paragraphArray;
      this.paragraphTempArray = _.filter(resultArray, function(obj)
      {
        if(obj.paraContent.toLowerCase().indexOf(searchStr) >= 0){
          return obj;
        }
      });
      // this.paragraphTempArray.forEach(obj=>{
      //   var innerHTML = "<span style='color:#21294d'>" + searchStr + "</span>";
      //   obj.paraContent = obj.paraContent.replace(new RegExp(searchStr, 'ig'), innerHTML);
      // })
    }
    else{
      this.paragraphTempArray = this.paragraphArray
    }
    this.currParaSearchStrLen = searchStr.length;
  }

  getAnalysisById(analysisId){
    this.loading = true;
    this.analysisSvc.getAnalysisById(analysisId).then(data=>{
      this.files = data.contributingDocuments;
      this.selectedContexts = data.contributingContexts;
      this.allContextsByDoc = data.contributingDocuments[0].contextDistribution;
      this.allContextsByDoc = this.utilSvc.updateWeightAndColor(this.allContextsByDoc);
      this.selectedContexts = this.utilSvc.updateWeightAndColor(this.selectedContexts);
      this.selectedContexts.forEach(obj=>{
        var ctxtName=obj.name.replace(new RegExp(' ', 'g'), '');
        var parentObj=_.findWhere(this.allContextsByDoc,{contextName:ctxtName});
        if(parentObj){
          obj.value=parentObj.value;
          obj.isSelected=parentObj.isSelected = true;
          obj.color=parentObj.color;
        }
      })

      this.files.forEach(obj => {
        obj.isSelected=false;
      });
      
      this.changeFileSelection(0,null);
      this.getRemainingContextDetails();
      this.loading = false;
    });
  }
  
  onInitialise(){
    
    this.sub = this.route.params.subscribe(params => {
      this.clientState.lastAnalysisId = params['id'];
      this.getAnalysisById(this.clientState.lastAnalysisId);
    });
  }

  ngOnInit() {
    this.onInitialise();
  }

}
