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

    r_color=165;
    g_color=0;
    b_color=0;
    color:string;

    constructor(private clientState:ClientState){
    }
    
    updateWeightAndColor(contextsList : any[]){
        contextsList.forEach(obj=>{
            obj.isSelected=false;
            obj.value=(obj.weight*100).toFixed(2)+"%";
            var ctxObj = this.clientState.contextsColors[obj.contextURI];
            if(ctxObj != undefined){
                obj.contextId = obj.id = ctxObj.id;
                obj.color = ctxObj.color;
                obj.contextName = obj.name = ctxObj.name;
            }
        })
        return contextsList;
    }

    // mapContextColor(contextData){
    //     contextData.forEach(obj=>{            
    //         var ctxName = obj.name;
    //         ctxName = ctxName.replace(" ","");
    //         var ctxObj = this.clientState.contextsColors[ctxName];
    //         if(ctxObj != undefined){
    //             ctxObj.id = obj.id;
    //             ctxObj.contextURI = obj.contextURI;
    //             obj.color = ctxObj.color;
    //         }
    //     })
    //     console.log(contextData);
    //     return contextData;
    // }

    colorGenerator(){
        if(this.g_color<=250)
            this.g_color+=20;
        else this.g_color-=19;
        if(this.b_color<=250)
            this.b_color+=20;
        else this.b_color-=19;
        var c = 'rgb('+this.r_color+','+this.g_color+','+this.b_color+')';
        // var color='hsl('+c+',100%,50%)';
        return c;
    }

    createContextColor(contextData){
        contextData = _.sortBy(contextData, 'name');
        contextData.forEach(obj=>{ 
            var color = this.colorGenerator();   
            this.clientState.contextsColors[obj.contextURI]={
                name:obj.name,
                id:obj.id,
                color:color
            };
            obj.color = color;
        })
        console.log(this.clientState.contextsColors);
        return contextData;
    }

    addHighlightingInfo(paraText,list)
    {   
        list.forEach(obj=>{
            var str = obj.word.toLowerCase()
            var splitted = str.split(" ");
            var splitted_joined = splitted.join("[ \t-_]?")
           
            var splitted_joined_reg = new RegExp(splitted_joined)
            if (paraText.search(splitted_joined_reg) != -1 ) {
                var innerHTML = "<span style='background-color:"+obj.color+"'>" + obj.word + "</span>";
                paraText = paraText.replace(new RegExp(obj.word, 'ig'), innerHTML);
            }
        })
        return paraText;
    }

    // flattenContextWords(ctxWords : ContextWord[]){

    //     var flattenedList : any[] = [];
    //     ctxWords.forEach( ctxWord => {
    //         var ctxName = ctxWord.contextName;
    //         var color = '#000055';
    //         ctxName = ctxName.replace(" ","");
    //         var ctxObj = this.clientState.contextsColors[ctxName];
    //         if(ctxObj != undefined)
    //             color = ctxObj.color;

    //         ctxWord.words.forEach( a => {
    //             var obj : any = {};
    //             obj.word = a;
    //             obj.color = color;
    //             flattenedList.push(obj);
    //         })
    //     });
    //     return flattenedList;
    // }
}
