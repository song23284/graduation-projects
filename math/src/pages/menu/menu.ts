import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams ,Nav,App} from 'ionic-angular';
import {TabssPage} from '../tabss/tabss'
import { LoginPatrentPage } from '../login-patrent/login-patrent';

export interface PageInterface{
  title:string;
  pagename:string;
  tabComponent?:any;
  index?:number;
  icon:string;

}

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = TabssPage;

  @ViewChild(Nav) nav:Nav;
  pages:PageInterface[]=[
    {title:'Home',pagename:'TabssPage',tabComponent:'HomeparentPage',index:0,icon:'home'},
    {title:'Home',pagename:'TabssPage',tabComponent:'HomeparentPage',index:1,icon:'home'},
    {title:'Home',pagename:'TabssPage',tabComponent:'HomeparentPage',index:2,icon:'home'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private app:App) {
               
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page:PageInterface){

  }

  isActive(page:PageInterface){

  }

}
