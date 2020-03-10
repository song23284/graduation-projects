import { Component , ViewChild,Renderer, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-scoreadditionnumber',
  templateUrl: 'scoreadditionnumber.html',
})
export class ScoreadditionnumberPage {

  accordionExapanded = false;
  @ViewChild('cc') cardContent:any;
  @ViewChild('cc1') cardContentt:any;
  @ViewChild('cc2') cardContenttt:any;
  @ViewChild('cc3') cardContentttt:any;  
  @Input('title')title:string;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('barCanvass') barCanvass;
  @ViewChild('barCanvasss') barCanvasss;
  @ViewChild('barCanvassss') barCanvassss;  

  barChart: any;
  icon:string="arrow-forward";
  score1;
  score2;
  score3;
  score4;
  score5;
  scorenum;

  Url='https://us-central1-testaut-ca5fc.cloudfunctions.net/app/get/add/score/addlevel1';

  constructor(public renderer: Renderer,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient) {
  }

  getObjectWithoutKnowingKey(data){
    let objects=[];
    for(var propName in data){
      if(data.hasOwnProperty(propName)){
      objects.push(data[propName]);}

    }
    return objects;
  }

 
  ionViewDidLoad() {
    ///test getdata
  
    ///////get data 
    this.http.get(this.Url)
          .subscribe((data:any[])=>{
            let result =this.getObjectWithoutKnowingKey(data);
    
            this.score1=result[result.length-1].score;
            this.score2=result[result.length-2].score;
            this.score3=result[result.length-3].score;
            this.score4=result[result.length-4].score;
            this.score5=result[result.length-5].score;
            console.log(this.score1,this.score2,this.score3,this.score4,this.score5);
            //console.log(this.scorenum.length);

   /////chart
    this.barChart = new Chart(this.barCanvas.nativeElement, {
    
      type:'bar',
      data:{
        labels:["ครั้งที่ 1" ,"ครั้งที่ 2","ครั้งที่ 3","ครั้งที่ 4","ครั้งที่ 5"],       
        datasets:[{
          label:'ค่าเฉลี่ย : '+(this.score1+this.score2+this.score3+this.score4+this.score5)/5,
          data:[this.score1,this.score2,this.score3,this.score4,this.score5],
          backgroundColor:[
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)'
          ],
          borderColor:[
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)'

          ],
          borderWidth:1
        }]
      },
      options:{
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    } );
//***************Barchart2 */
this.barChart = new Chart(this.barCanvass.nativeElement, {

  type:'bar',
  data:{
    labels:["ครั้งที่ 1" ,"ครั้งที่ 2","ครั้งที่ 3","ครั้งที่ 4","ครั้งที่ 5"],       
    datasets:[{
      label:'# of Votes',
      data:[12,19,3,5,2,3],
      backgroundColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)'
      ],
      borderColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)'

      ],
      borderWidth:1
    }]
  },
  options:{
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero:true
        }
      }]
    }
  }
} );

//***************Barchart3 */
this.barChart = new Chart(this.barCanvasss.nativeElement, {

  type:'bar',
  data:{
    labels:["ครั้งที่ 1" ,"ครั้งที่ 2","ครั้งที่ 3","ครั้งที่ 4","ครั้งที่ 5"],       
    datasets:[{
      label:'# of Votes',
      data:[12,19,3,5,2,3],
      backgroundColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)'
      ],
      borderColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)'

      ],
      borderWidth:1
    }]
  },
  options:{
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero:true
        }
      }]
    }
  }
} );

//***************Barchart4 */
this.barChart = new Chart(this.barCanvassss.nativeElement, {

  type:'bar',
  data:{
    labels:["ครั้งที่ 1" ,"ครั้งที่ 2","ครั้งที่ 3","ครั้งที่ 4","ครั้งที่ 5"],       
    datasets:[{
      label:'# of Votes',
      data:[12,19,3,5,2,3],
      backgroundColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)'
      ],
      borderColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)'

      ],
      borderWidth:1
    }]
  },
  options:{
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero:true
        }
      }]
    }
  }
  } );

});
    console.log('ionViewDidLoad ScoreadditionnumberPage');
  }

  ngOnInit() {
    console.log(this.cardContent.nativeElement);
    this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "max-height 500ms, padding 500ms");
  }

  toggleAccordion1() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "13px 16px");

    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";

  }

  toggleAccordion2() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cardContentt.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContentt.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContentt.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContentt.nativeElement, "padding", "13px 16px");

    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";

  }

  toggleAccordion3() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cardContenttt.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContenttt.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContenttt.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContenttt.nativeElement, "padding", "13px 16px");

    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";

  }

  toggleAccordion4() {
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cardContentttt.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.cardContentttt.nativeElement, "padding", "0px 16px");

    } else {
      this.renderer.setElementStyle(this.cardContentttt.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.cardContentttt.nativeElement, "padding", "13px 16px");

    }

    this.accordionExapanded = !this.accordionExapanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";

  }

}
