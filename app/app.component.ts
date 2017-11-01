import { Component ,OnInit} from '@angular/core';

import { BaseHttpService } from './services/base-http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  dataLoading:boolean=true;

  constructor(private baseSvc: BaseHttpService) {
      baseSvc.loading.subscribe(flag => this.showLoading(flag));
  }

  showLoading(flag: boolean):void{
    this.dataLoading=flag;
  }
  ngOnInit(){
    // this.baseSvc.loading.subscribe(flag => this.showLoading(flag));
  }
}
