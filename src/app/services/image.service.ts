import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private showAddImage:boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddImage():void {
    console.log("toggleAddImage ImageService");
    this.showAddImage = !this.showAddImage;
    this.subject.next(this.showAddImage)
  }
  onToggle(): Observable<any> {
    console.log("onToggle ImageService");
    return this.subject.asObservable();
  }


  addDir(): Observable<any>  { 
    console.log("addDir ImageService")
    return this.subject.asObservable()
  }
}
