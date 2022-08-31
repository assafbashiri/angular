import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import Cropper from "cropperjs"

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {


  subscription: Subscription;
  @Input() src:string = "";
  constructor(imageService:ImageService) {
    this.subscription = imageService.addDir().subscribe((val) => console.log(val+" in CnvasComponent"))
   }

  ngOnInit(): void {
  }



  load(address:string) {
    console.log(address);

  }

}
