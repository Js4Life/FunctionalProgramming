import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'paragraph-view',
  templateUrl: './paragraph-view.component.html',
  styleUrls: ['./paragraph-view.component.css']
})
export class ParagraphViewComponent implements OnInit {

  @Input() docType:any;
  @Input() para:any;
  @Input() relPara:any;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  currentPara:any;
  constructor(private utilSvc:UtilsService, private sanitizer: DomSanitizer) { }

  onContextClick(ctxt){
    if(ctxt.isSelected)
      this.change.emit(ctxt);
  }

  mapWordToContext(){
    
  }


  ngOnInit() {
    // this.currentPara=this.para;
    // var paraText = this.utilSvc.highlight(this.currentPara.paraContent,this.wordsList);
    // this.currentPara.paraContent=this.sanitizer.bypassSecurityTrustHtml(paraText);
    // this.mapWordToContext();
  }

}
