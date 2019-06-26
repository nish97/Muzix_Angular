import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ITracks } from '../Tracks';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService, private _messageService: MessageService) { }
  private _url: string = "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=United%20States&api_key=42d98bf2713ce3d39b0a83f2b6db31b3&format=json";
  Tracks: ITracks[] = [];
  whishlisted: ITracks[] = [];
  ngOnInit() {
    this._authenticationService.getToken(this._url).subscribe(data => {
      this.Tracks = data.tracks.track;
      console.log("United States:",this.Tracks);
      this.Tracks.forEach(ele => ele.wished = false );
      this.checkWished();
    });
    this._messageService.receiveData().subscribe(data => {
      if (data.data === "wished") {
        this.Tracks = this.whishlisted;
        console.log("WhishList:",this.Tracks);
      }
      else {
        // console.log("Country", data);
        this._url = "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" + data.data + "&api_key=42d98bf2713ce3d39b0a83f2b6db31b3&format=json";
        this._authenticationService.getToken(this._url).subscribe(data => {
          this.Tracks = data.tracks.track;
          this.Tracks.forEach(ele => ele.wished = false );
          this.checkWished();
           });
          console.log(data.data,":",this.Tracks);
      }
    });
  }

  checkWished() {
    this.Tracks = this.Tracks.map(ele => {
      this.whishlisted.forEach(x => {
        if (x.name === ele.name)
          ele.wished = x.wished;
      })
      return ele
    });
  }

  Wish(track:ITracks):string{
    if(track.wished)
      return "favorite";
    else
      return "favorite_border";
  }

  getMyStyles(Track:ITracks){
    let _url ="url("+ Track.image[1]["#text"]+")";
    let myStyles={'background-image': _url , 'background-size': 'cover'}
    return myStyles;
  }

  addToWishlist(track: ITracks) {
    track.wished = !track.wished;
    if (track.wished)
      this.whishlisted.push(track);
    else
      this.whishlisted = this.whishlisted.filter(ele => ele.name !== track.name);
    console.log(this.whishlisted);
  }

}
