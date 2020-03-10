import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';

/**
 * Generated class for the ProgressEx1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-progress-ex1',
  templateUrl: 'progress-ex1.html',
})
export class ProgressEx1Page {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

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

    
  }

}
