import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {RegulationVM} from "../../models/regulation.model"
import {ContextVM} from "../../models/context.model"
import {HttpVerbs} from "../../models/constants.model"
import {BaseHttpService} from "../../services/base-http.service"
import { ClientState} from '../../providers/clientstate.provider';

declare var stringformat : any;

@Injectable()
export class UserSvc extends BaseHttpService{

    myURL : string = this.baseUrl + 'users';
    userId :string = "10:1545";

    constructor( appState: ClientState, http: Http ){
        super(appState, http);
    }

    // getDocumentAccessModifierTypes(){
    //     return this.invokeService(this.env.BASE_URL5, '', HttpVerbs.GET);
    // }

    getAllUsers() /*: Promise<RegulationVM>*/{
        return this
                .invokeService(this.myURL+UserURLS.ALLUSERS.url,null,HttpVerbs.GET)
            .then(data => data.data[UserURLS.ALLUSERS.propname]);
    }
    getChecklistByUserId(){
        var remUrl = stringformat(UserURLS.CHECKLIST_BY_USER.url,this.filterIdString(this.userId));
        return this
                .invokeService(this.myURL+remUrl,null,HttpVerbs.GET)
            // .then(data => data.data);
            .then(data => data.data[UserURLS.CHECKLIST_BY_USER.propname]);
    }
}

var UserURLS = {
    ALLUSERS : {
        url : "",
        propname : "users" 
    },
    CHECKLIST_BY_USER : {
        url : "/{0}/checklist",
        propname : "checkLists"
    }
}
