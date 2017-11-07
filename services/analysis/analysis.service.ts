import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {RegulationVM} from "../../models/regulation.model";
import {ContextVM} from "../../models/context.model";
import {FolderVM} from "../../models/folder.model";
import {DocumentVM} from "../../models/document.model";
import {AnalysisRequestVM} from "../../models/analysisrequest.model";
import {AnalysisResponseVM} from "../../models/analysisresponse.model";
import {ParagraphVM} from "../../models/paragraph.model";
import {HttpVerbs} from "../../models/constants.model";
import {BaseHttpService} from "../../services/base-http.service";
import { ClientState} from '../../providers/clientstate.provider';
import { DocumentUploadRquestVM} from '../../models/documentuploadrequest.model';
import { NewChecklistRequestVM} from '../../models/newchecklistrequest.model';

declare var stringformat : any;

@Injectable()
export class AnalysisService extends BaseHttpService {
    myURL : string = this.baseUrl + 'analysis';

    constructor( appState: ClientState, http: Http ){
        super(appState, http);
    }

        //Creates a New Analysis with a set of selected documents, contexts
    createNewAnalysis(analysisReqVM: AnalysisRequestVM) :Promise<any>{
        
        return this
                .invokeService(this.myURL+AnalysisURLS.CREATE_ANALYSIS.url,analysisReqVM,HttpVerbs.POST)
                .then(data => data.data[AnalysisURLS.CREATE_ANALYSIS.propname]);
    }
    getAllAnalysis():Promise<any>{
      return this
                .invokeService(this.myURL+AnalysisURLS.GET_ALL_ANALYSIS.url,"",HttpVerbs.GET)
                .then(data => data.data[AnalysisURLS.GET_ALL_ANALYSIS.propname]);
    }
        //Updates the Analysis by updating document and context set
    updateAnalysis(analysisId:string, analysisReqVM: AnalysisRequestVM) :Promise<any>{
      var remUrl = stringformat(AnalysisURLS.UPDATE_ANALYSIS.url,this.filterIdString(analysisId));
        return this
                .invokeService(this.myURL+remUrl,analysisReqVM,HttpVerbs.PUT)
                .then(data => data.data[AnalysisURLS.UPDATE_ANALYSIS.propname]);
    }
        //Retrieves a previously saved analysis by analysisId
    getAnalysisById(analysisId:string) :Promise<AnalysisResponseVM>{
      var remUrl = stringformat(AnalysisURLS.GET_ANALYSIS_BY_ID.url,this.filterIdString(analysisId));
        return this
                .invokeService(this.myURL+remUrl,null,HttpVerbs.GET)
                .then(data => data.data[AnalysisURLS.GET_ANALYSIS_BY_ID.propname]);
    }
        //Deletes an analysis
    deleteAnalysisById(analysisId:string) :Promise<any>{
      var remUrl = stringformat(AnalysisURLS.DELETE_ANALYSIS_BY_ID.url,this.filterIdString(analysisId));
        return this
                .invokeService(this.myURL+remUrl,null,HttpVerbs.DELETE)
                // .then(data => data.data[AnalysisURLS.DELETE_ANALYSIS_BY_ID.propname]);
                .then(data => data.data);
    }
        //Bookmarks An Analysis
    bookmarkAnAnalysis(analysisId:string) : Promise<any>{
      var remUrl = stringformat(AnalysisURLS.BOOKMARK_AN_ANALYSIS.url,this.filterIdString(analysisId));
      return this
              .invokeService(this.myURL+remUrl,null,HttpVerbs.POST)
              .then(data => data.data[AnalysisURLS.BOOKMARK_AN_ANALYSIS.propname]);
    }
        //Remove bookmark of an analysis
    removeBookmarkOfAnAnalysis(analysisId:string) : Promise<any>{
      var remUrl = stringformat(AnalysisURLS.REMOVE_BOOKMARK_OF_ANALYSIS.url,this.filterIdString(analysisId));
      return this
              .invokeService(this.myURL+remUrl,null,HttpVerbs.DELETE)
              .then(data => data.data[AnalysisURLS.REMOVE_BOOKMARK_OF_ANALYSIS.propname]);
    }
        //Returns All the Related Paras based on the selected contexts and documents in an analysis.
    getRelatedParasInAnAnalysis(analysisId:string, paraId: string) : Promise<any>{
      var remUrl = stringformat(AnalysisURLS.GET_RELATED_PARAS_OF_ANALYSIS.url, this.filterIdString(analysisId), this.filterIdString(paraId));
      return this
              .invokeService(this.myURL+remUrl,null,HttpVerbs.GET)
              //.then(data => data.data);
               .then(data => data.data[AnalysisURLS.GET_RELATED_PARAS_OF_ANALYSIS.propname]);
    }

    createChecklist(analysisId:string,checklistObj: NewChecklistRequestVM) :Promise<any>{
        var remUrl = stringformat(AnalysisURLS.CREATE_CHECKLIST.url,this.filterIdString(analysisId));
        return this
                .invokeService(this.myURL+remUrl,checklistObj,HttpVerbs.POST)
                .then(data => data.data[AnalysisURLS.CREATE_CHECKLIST.propname]);
    }
}
var  AnalysisURLS = {
      CREATE_ANALYSIS : {
          url : "",
          propname : "analysis" //needs to check 
      },
      CREATE_CHECKLIST : {
          url : "/{0}/checklist",
          propname : "checklist" //needs to check 
      },
      GET_ALL_ANALYSIS:{
          url : "",
          propname : "analysis"
      },
      UPDATE_ANALYSIS : {
        url : "/{0}",
        propname : "" //needs to check 
      },
      GET_ANALYSIS_BY_ID : {
        url : "/{0}",
        propname : "analysis" //needs to check 
      },
      DELETE_ANALYSIS_BY_ID : {
        url : "/{0}",
        propname : "" //needs to check 
      },
      BOOKMARK_AN_ANALYSIS : {
        url: "/{0}/bookmark",
        propname : "" //needs to check 
      },
      REMOVE_BOOKMARK_OF_ANALYSIS : {
        url: "/{0}/bookmark",
        propname : "" //needs to check 
      },
      GET_RELATED_PARAS_OF_ANALYSIS : {
        url: "/{0}/relatedParas/{1}",
        propname : "relatedParagraphs" //needs to check 
      }
  }