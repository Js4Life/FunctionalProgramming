import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DomSanitizer,BrowserModule} from '@angular/platform-browser';

import { AppRouteConfig} from '../app.router-config';
import * as _ from 'underscore';
import { FileUploader , FileItem , ParsedResponseHeaders , FileUploaderOptions, FileSelectDirective} from 'ng2-file-upload';

import { Http } from '@angular/http';
import { BaseHttpService } from '../services/base-http.service';
import { MasterDataSvc } from '../services/masterdata/masterdata.service';
import { DocumentSvc } from '../services/document/document.service';
import { UtilsService } from '../services/utils.service';
import { AnalysisService } from '../services/analysis/analysis.service';

import { ClientState } from '../providers/clientstate.provider';
import { environment } from '../../environments/environment';

import { FolderVM } from '../models/folder.model';
import { DocumentUploadRquestVM } from '../models/documentuploadrequest.model';
import { AnalysisRequestVM } from '../models/analysisrequest.model';


@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {

  showDocumentDetails:boolean=false;
  currentFileAdded:boolean=false;
  fromAddedFiles:boolean=false;
  newFolder:boolean=false;
  showContexts:boolean=true;


  lastDomain:any = {};
  selectedFileIdx:number=0;
  pageNumber:number;
  newFolderName:string;
  pageImg:string;
  
  currentFile:any;
  documentType:string; //Internal or External document
  selectedFilesForAnalysis:any=[];
  selectedContexts:any=[];
  finalSelections:any={};

  drilldownData:any = {folderList:[],documentList:[]};
  folderObject:FolderVM;
  uploadObj:DocumentUploadRquestVM;
  analysisModel:AnalysisRequestVM = new AnalysisRequestVM();
  uploadedDoc:FormData;
  navigateData:any=[{"name": "All", "type": "Folder", "id": 2}];
  hierarchy:any=[];
    folderOptions:any=[
    {name:'New Folder', icon:'fa-plus'},
    {name:'Upload Files', icon:'fa-upload'}
  ]
  glossaryList:any=['Active','Inactive','Busy','Delegate','Emphasize','Taken','Borrowed'];
  allContextsByDoc:any=[];
  loading : boolean = false;

  public uploader:FileUploader;
  url:any;

  constructor(private arc:AppRouteConfig, private masterDataSvc:MasterDataSvc,private documentSvc:DocumentSvc,private domSanitizer : DomSanitizer,
    private clientState:ClientState, private utilSvc:UtilsService, private route:ActivatedRoute, private analysisSvc:AnalysisService) {
    this.uploader = new FileUploader({url:this.url });
  }



  updateUploadUrl(event: any){
      var file;
  
      for(var i= 0; i < event.target.files.length; i++){
  
          this.loading = true;
          file = event.dataTransfer ? event.dataTransfer.files[i] : event.target.files[i] || event.srcElement;
          this.uploadedDoc=new FormData();
          this.uploadedDoc.append('document',file);
    
          var folderId=this.lastDomain.id.replace('#','');
          //call the upload New Document once per doc
          this.documentSvc.uploadANewDocument(this.uploadedDoc, folderId).then(data=>{
            this.loading = false;
            var res=data;
            this.getNextLevelData(this.drilldownData.root);
          });
        }    
        //this.loading = false;
  }

  _handleReaderLoaded(e) {
      var reader = e.target;
  }


  onRightOptClick(opt,e){
    if(!e)
      $('.labelStyle').find('.contextsBtns').first().removeClass('rightPanelBtnInactive').addClass('rightPanelBtnActive').siblings().removeClass('rightPanelBtnActive').addClass('rightPanelBtnInactive');
    else
      $(e.currentTarget).removeClass('rightPanelBtnInactive').addClass('rightPanelBtnActive').siblings().removeClass('rightPanelBtnActive').addClass('rightPanelBtnInactive');
    if(opt=='contexts'){
      this.showContexts=true;
    }
    else{
      this.showContexts=false;
    }
  }

  onNewFolderClick(){
    this.newFolderName='';
    this.newFolder=true;
  }
  addNewFolder(){
    if(this.newFolderName || this.newFolderName!=''){
    
      var newFolderName=this.newFolderName;
      var parentFolderId=this.drilldownData.root;
      /*if(this.drilldownData.folderList && this.drilldownData.folderList.length>0){
        var parentFolderId=this.drilldownData.root;
      }
      else if(this.drilldownData.documentList && this.drilldownData.documentList.length>0){
        var parentFolderId=this.drilldownData.root;
      }else{
        var parentFolderId=this.drilldownData.root;
      } */
      this.folderObject={ name:newFolderName, parentFolderId:parentFolderId , parentFolderName:'', children:[], documentList:[]};
      
      this.loading = true;      
      this.documentSvc.createAFolder(this.folderObject).then(data=>{
          this.loading = false;
          this.getNextLevelData(parentFolderId);
      })
    }
    this.newFolder=false;
  }

  fileChangeDetector(emittedData){
    if(emittedData.function=='rename'){
      
    }
    else{
      if(emittedData.folderID){   // has 'folderId' if the data is a file, no 'folderId' property present if folder
        this.showCurrentFile(emittedData);
        $('.selectionList').removeClass('activeSelectionList').addClass('inactiveSelectionList'); //remove selection of list
        // $('.fileList').removeClass('opacity');
        this.fromAddedFiles=false;
      }
      else{
        var folderId=emittedData.id.replace('#','');
        this.getNextLevelData(folderId);
      }
      this.showContexts=false;
      this.showDocumentDetails=false;
      $('.selectedfilesDetails').removeClass('selectedBtn');
      this.changeHierarchy(emittedData);
      // this.updateUploadUrl();
    }
  }

  changeHierarchy(data) {
    if(!_.contains(this.hierarchy, data)) {   //check if the clicked item is in the hierarchy
      var lastobj = this.hierarchy[this.hierarchy.length - 1];
      if(lastobj.parentFolderId == data.parentFolderId || lastobj.folderID) {    //if clicked item in same list as previous item OR is a file
        this.hierarchy.pop();
      }
      this.hierarchy.push(data);
    }
    
    if(data.folderID) {  //if file, don't show the file name in column header
      this.lastDomain = this.hierarchy[this.hierarchy.length - 2];
    }
    else {
      this.lastDomain = this.hierarchy[this.hierarchy.length - 1];
    }
  }

  navigateHierarchy(folderId,selectedItem){
    if(selectedItem && selectedItem.folderID){
      //then the selected item is a file
    }
    else if(selectedItem.name=='All'){
       this.getRegulationTypes();
       this.hierarchy=[{"name": "All", "type": "Folder"}];
       this.lastDomain = this.hierarchy[this.hierarchy.length - 1];
    }
    else if(selectedItem.name=='Internal' || selectedItem.name=='External'){
      this.regulationChange(selectedItem);
    }
    else{
      //clear hierarchy starting from the immediate next of the selected
      var idx= this.hierarchy.findIndex(x => x.id==folderId);
      this.hierarchy.splice(idx+1,this.hierarchy.length-(idx+1));
      this.lastDomain = this.hierarchy[this.hierarchy.length - 1];
      this.getNextLevelData(folderId);  //get data of current selected folder
    }
    this.showDocumentDetails = false;
  }

  getRegulationTypes(){
    this.documentSvc.getTopLevelFolders().then(data=>{
      this.drilldownData.folderList=data;
      this.drilldownData.documentList=null;
    })
  }

  regulationChange(item){
    this.hierarchy=[{"name": "All", "type": "Folder"}];
    this.hierarchy.push(item);
    this.getNextLevelData(item.id);
    this.documentType=item.name;
    this.lastDomain = item;
  }

  getNextLevelData(folderId){
    this.documentSvc.getFolderContent(folderId).then(data=>{
      this.drilldownData.root = data['id'];
      this.drilldownData.folderList=data.children;
      this.drilldownData.documentList=data.documentList;
    })
  }

  contextChange(event){
    if(event.contextName){
      if(event.isSelected){   
        this.selectedContexts.push(event);
      }
      if(!event.isSelected)  {
        this.selectedContexts= _.reject(this.selectedContexts, function(obj){
          if(obj.name == event.name){
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
  }

  glossaryChange(event){
    
  }

  showCurrentFile(emittedData){
    this.loading = true;    
    this.pageNumber=emittedData.startPage;
    this.documentSvc.getDocumentById(emittedData.id).then(data=>{
      this.currentFile=data;
      this.currentFile.docType=this.documentType;
      this.currentFile.numPages=this.currentFile.endPage;
      this.getVocabsByDocId();
      this.getContextsByDocId();
      this.checkCurrentFileAdded();
    })
    this.getDocumentPageImages(emittedData.id,this.pageNumber);
  }
  getDocumentPageImages(docId,pageNo){
    this.documentSvc.getPageImage(docId,pageNo.toString()).then(data=>{
      this.pageImg=data;
    })
  }
  getContextsByDocId(){
    this.documentSvc.getAllContextsOfADoc(this.currentFile.id).then(data=>{
      this.allContextsByDoc=data.contextDistribution;
      this.allContextsByDoc = this.utilSvc.updateWeightAndColor(this.allContextsByDoc);
      this.showDocumentDetails=true;
      this.showContexts=true;
      this.onRightOptClick('contexts',null);
      this.loading = false;
    })
  }
  getVocabsByDocId(){
    this.documentSvc.getAllVocabsOfADoc(this.currentFile.id).then(data=>{
      this.currentFile.glossaryList=data.glossaryList;
    })
  }
  pdfPageNavigate(opt){
    if(opt=='next' && this.pageNumber!=this.currentFile.numPages){
      this.pageNumber+=1;
    }
    if(opt=='prev' && this.pageNumber>this.currentFile.startPage){
      this.pageNumber-=1;
    }
    this.getDocumentPageImages(this.currentFile.id,this.pageNumber);
  }


  checkCurrentFileAdded(){
    if(_.findWhere(this.selectedFilesForAnalysis,{ id : this.currentFile.id })){
      this.currentFileAdded=true;
    }
    else {
      this.currentFileAdded=false;
    }
  }
  addFile(file) {
    var duplicate=false;
    this.selectedFilesForAnalysis.forEach(obj => {
      if(obj.id == file.id){
        duplicate=true;
      }
    });
    if(!duplicate){
      this.selectedFilesForAnalysis.push(file);
      this.currentFileAdded=true;
    }
    console.log(this.selectedFilesForAnalysis);
    this.clientState.selectedFilesForAnalysis = this.selectedFilesForAnalysis;
  }
  removeFile(file){
    this.selectedFilesForAnalysis= _.reject(this.selectedFilesForAnalysis, function(obj){
      if(obj.id==file.id){
        return obj;
      }
    });
    if(this.fromAddedFiles){
      this.manageRemainingFiles();
    } 
    else{
      this.currentFileAdded=false; 
    }  
  }
  removeAllFile(){
    this.selectedFilesForAnalysis=[];
    this.currentFileAdded=false; 
    this.currentFile=null;
    this.fromAddedFiles=false;
    this.showDocumentDetails=false;
  }
  manageRemainingFiles(){
    if(this.selectedFilesForAnalysis.length>0){
      this.currentFileAdded=true;
      if(this.selectedFileIdx==0){
        //do nothing..keep the index at 0
      }
      else{
        this.selectedFileIdx-=1;
      }
      this.currentFile=this.selectedFilesForAnalysis[this.selectedFileIdx];
    }
    if(this.selectedFilesForAnalysis.length==0){
      this.currentFileAdded=false;
      this.selectedFileIdx=0;
      this.showDocumentDetails=false;
    }
    this.clientState.selectedFilesForAnalysis = this.selectedFilesForAnalysis;
  }
  selectAddedFiles(e){
    if(this.selectedFilesForAnalysis.length>0){
      $('.selectedfilesDetails').addClass('selectedBtn'); 
      var child = $('.fileList').children();
      $('.fileList').find('list').find('.listPanel').find('li').removeClass('active');
      // $('.fileList').addClass('opacity');
      this.fromAddedFiles=true;
      this.navigateToAddedFiles(null);
      this.currentFileAdded=true;
    }
  }
  navigateToAddedFiles(opt){
    if(opt=='next' && this.selectedFileIdx!=this.selectedFilesForAnalysis.length-1){
      this.selectedFileIdx+=1;
    }
    if(opt=='prev' && this.selectedFileIdx>0){
      this.selectedFileIdx-=1;
    }
    this.currentFile=this.selectedFilesForAnalysis[this.selectedFileIdx];
  }

  doneSelection(){
    if(this.selectedFilesForAnalysis.length==0){
      alert('Add a file to analyse');
    }
    else {
      console.log('selected file');
      console.log(this.selectedFilesForAnalysis);
      this.finalSelections= { filesForAnalysis: this.selectedFilesForAnalysis, selectedContexts : this.selectedContexts, allContextsByDoc : this.allContextsByDoc };
      this.clientState.selectedDocumentsWithContexts=this.finalSelections;
      this.runAnalysis();
    }
  }

  runAnalysis(){
    var documentRids=[];
    var contextRids=[];
    this.selectedFilesForAnalysis.forEach(obj=>{
      documentRids.push(obj.id);
    })
    this.selectedContexts.forEach(obj=>{
      contextRids.push(obj.contextId);
    })
    this.analysisModel.docRids = documentRids;
    this.analysisModel.contextRids = contextRids;
    this.analysisModel.name = this.selectedFilesForAnalysis[0].name;

    this.analysisSvc.createNewAnalysis(this.analysisModel).then(data=>{
      if(data.id){
        this.clientState.lastAnalysisId=data.id;
        this.selectedFilesForAnalysis=[];
        this.arc.gotoSelectedStates(data.id);
      }
    })
  }

  cancel(){
    this.onIntialise();
  }

  onIntialise(){
    this.route.params.subscribe(val => {
      this.selectedFilesForAnalysis=[];
      if(this.clientState.selectedFilesForAnalysis && this.clientState.selectedFilesForAnalysis.length>0){
        this.selectedFilesForAnalysis = this.clientState.selectedFilesForAnalysis;
      }
      this.selectedContexts=[];
      this.finalSelections={};
      if(this.clientState.selectedRegulation){
        this.regulationChange(this.clientState.selectedRegulation);
        this.showDocumentDetails=false;
      }
    });
  }

  ngOnInit() {
    this.onIntialise();
    
  }
}


