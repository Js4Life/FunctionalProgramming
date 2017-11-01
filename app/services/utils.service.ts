import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {RegulationVM} from "../models/regulation.model";
import {ContextVM} from "../models/context.model";
import {ContextWeightVM} from "../models/contextweight.model";
import * as _ from 'underscore';


import { ClientState } from '../providers/clientstate.provider';
import { ContextWord } from '../models/contextword.model';



@Injectable()
export class UtilsService {

    constructor(private clientState:ClientState){
    }
    
    updateWeightAndColor(contextsList : any[]){
        contextsList.forEach(obj=>{
            obj.isSelected=false;
            obj.value=(obj.weight*100).toFixed(2)+"%";
            
            /*var ctxName = obj.contextName = obj.name.replace(" ","");
            var ctxObj = this.clientState.contextColorMap[ctxName];
            if(ctxObj != undefined){
                obj.contextId = obj.id = ctxObj.id;
                obj.color = ctxObj.color;
            }*/
            obj.color = '#'+Math.floor(Math.random()*16777215).toString(16);
            
            // obj.color='grey';
        })
        return contextsList;
    }

    mapContextColor(contextData){
        contextData.forEach(obj=>{            
            
            obj.color = '#'+Math.floor(Math.random()*16777215).toString(16);
            
            /*var ctxName = obj.name;
            ctxName = ctxName.replace(" ","");
            var ctxObj = this.clientState.contextColorMap[ctxName];
            if(ctxObj != undefined){
                // obj.id = ctxObj.id;
                ctxObj.id = obj.id;
                ctxObj.contextURI = obj.contextURI;
                obj.color = ctxObj.color;
            }*/
        })
        console.log(contextData);
        return contextData;
    }

    addHighlightingInfo(paraText,list)
    {   
        list.forEach(obj=>{
            // var innerHTML = "<span class='highlight'>" + obj.word + "</span>";
            var innerHTML = "<span style='background-color:"+obj.color+"'>" + obj.word + "</span>";
            paraText = paraText.replace(new RegExp(obj.word, 'ig'), innerHTML);
        })
        return paraText;
    }
    flattenContextWords(ctxWords : ContextWord[]){

        var flattenedList : any[] = [];
        ctxWords.forEach( ctxWord => {
            var ctxName = ctxWord.contextName;
            var color = '#000055';
            ctxName = ctxName.replace(" ","");
            var ctxObj = this.clientState.contextColorMap[ctxName];
            if(ctxObj != undefined)
                color = ctxObj.color;

            ctxWord.words.forEach( a => {
                var obj : any = {};
                obj.word = a;
                obj.color = color;
                flattenedList.push(obj);
            })
        });
        return flattenedList;
    }
}
