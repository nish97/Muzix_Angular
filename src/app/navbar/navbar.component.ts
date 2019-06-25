import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  countries: Array<string> = ["India", "United States", "Spain", "United Kingdom", "Malaysia"];
  constructor(private _messageService: MessageService) { }

  ngOnInit() {
  }
  getCountryTracks(country: string) {
    this._messageService.sendData(country);
  }
  openWishlist(){
    this._messageService.sendData("wished");
  }

}
