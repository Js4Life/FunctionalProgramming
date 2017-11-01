import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {RegulationVM} from "../../models/regulation.model"
import {ContextVM} from "../../models/context.model"
import {HttpVerbs} from "../../models/constants.model"
import {BaseHttpService} from "../../services/base-http.service"
import { ClientState} from '../../providers/clientstate.provider';

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
}

var checklistURLS = {
    CHECKLIST_BY_ID : {
        url : "/{0}",
        propname : "checklist"
    }
}
