import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw'

/*
  Generated class for the Exercise1Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Exercise1Provider {

  ex1;
  ex1Url = 'assets/data/Exercise1.json';

  constructor(public http: HttpClient) {
    console.log('Hello Exercise1Provider Provider');
  }

 getData() {
  this.http.get(this.ex1Url)
    .subscribe((data:any[])=>{
      this.ex1=data[1];
      this.ex1 = Array.of(this.ex1); ///when error [object]
      console.log(data[1]);
  })

  }

}
