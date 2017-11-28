import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ItemsResponse} from './model';
import { HttpErrorResponse ,HttpHeaders,HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/retry';
// import { HttpParams } from '@angular/common/http/src/params';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // results: string[];
  results: any;
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const body = {
      name: 'Brad'
    };

    this.http.post('/api/items/add',body,{params : new HttpParams().set('id','3')}).subscribe();

    // this.http.post('/api/items/add',body,{headers:new HttpHeaders().set('Authorization','my-auth-token1')}).subscribe();

    // const req = this.http.post('/api/items/add', body);
    // req.subscribe();

    // this.http.post('/api/developers/add', body).subscribe(data => {
    //   this.results = data;
    // });

// this.http.post('http://localhost:8080', body, {headers: new HttpHeaders().set('Authorization', 'my-auth-token')})

// const req = this.http.post('http://localhost:8080/', body);
// req.subscribe();
// req.subscribe();
// req.subscribe();
    // this.http.post('http://localhost:8080/', body).subscribe(data => {
    //   this.results = data['results'];
    //   console.log(data);
    // });
  }

  // ngOnInit(): void {
  //   this.http.get<ItemsResponse>('http://127.0.0.1:8080/', {observe: 'response'}).subscribe(data => {
  //     //  this.results = data['results'];
  //     this.results = data.body;
  //      console.log(data.headers.get('X-custom-Header'));
  //      console.log(data.body.results[0]);
  //     //  console.log(this.results);
  //     //  console.log(data.headers);
  //     //  console.log(data.body);
  //  //   this.results = data.results;
  //         });
  // }

  // ngOnInit(): void {
  //   this.http.get<ItemsResponse>('http://127.0.0.1:8080/')
  //   .retry(3)
  //   .subscribe(data => {
  //      this.results = data['results'];
  //   },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //             console.log('An Error occured:', err.error.message);
  //       } else {
  //         console.log(`Backend returned code ${err.status},body was : ${err.error}`);
  //       }
  //     }
  // );
  // }


// ngOnInit() {
//   this.http.get('http://localhost:8080',{responseType:'text'})
//   .subscribe(data => console.log(data));
// }
}
