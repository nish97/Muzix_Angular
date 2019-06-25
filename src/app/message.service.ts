import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private handler = new Subject<any>();
  constructor() { }
  sendData(data: string) {
    this.handler.next({ data });
    // console.log("gotData",this.handler);
  }
  receiveData(): Observable<any> {
    return this.handler.asObservable();
  }
}
