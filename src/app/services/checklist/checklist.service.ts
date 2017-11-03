import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {RegulationVM} from "../../models/regulation.model"
import {ContextVM} from "../../models/context.model"
import {HttpVerbs} from "../../models/constants.model"
import {BaseHttpService} from "../../services/base-http.service"
import { ClientState} from '../../providers/clientstate.provider';
import { checklistItemVM} from '../../models/checklistItem.model';


declare var stringformat : any;

@Injectable()
export class ChecklistSvc extends BaseHttpService{

    myURL : string = this.baseUrl + 'checklist';

    constructor( appState: ClientState, http: Http ){
        super(appState, http);
    }

    getChecklistById(id){
        var remUrl = stringformat(checklistURLS.CHECKLIST_BY_ID.url,this.filterIdString(id));
        return this
                .invokeService(this.myURL+remUrl,null,HttpVerbs.GET)
            // .then(data => data.data);
            .then(data => data.data[checklistURLS.CHECKLIST_BY_ID.propname]);
    }
     saveChecklistItem(checklistId:string,checklistItemObj:checklistItemVM){
        var remUrl = stringformat(checklistURLS.CREATE_CHECKLIST_ITEM.url,this.filterIdString(checklistId));
        return this
                .invokeService(this.myURL+remUrl,checklistItemObj,HttpVerbs.POST)
            // .then(data => data.data);
            .then(data => data.data[checklistURLS.CREATE_CHECKLIST_ITEM.propname]);
    }
    updateChecklistItem(checklistId:string,checklistItemObj:checklistItemVM){
        var remUrl = stringformat(checklistURLS.CREATE_CHECKLIST_ITEM.url,this.filterIdString(checklistId));
        return this
            .invokeService(this.myURL+remUrl,checklistItemObj,HttpVerbs.PUT)
            // .then(data => data.data);
            .then(data => data.data[checklistURLS.CREATE_CHECKLIST_ITEM.propname]);
    }
}

var checklistURLS = {
    CHECKLIST_BY_ID : {
        url : "/{0}",
        propname : "checklist"
    },
    CREATE_CHECKLIST_ITEM : {
        url : "/{0}/checklistItem",
        propname : "checklistItem"
    }
}
