import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import Cropper from "cropperjs"

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit {

  @ViewChild("image", {static:false})
  public imageElement: ElementRef;  

  @Input("src")
  public imageSource: string;

  public imageDestination:string
  private cropper: Cropper;
  constructor() { 
    this.imageDestination = "";
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit(){
    console.log("croperrrrr");
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: true,
      scalable: false,
      rotatable: true,
      aspectRatio: 1,
      crop: ()=> {
        const canvas = this.cropper.getCroppedCanvas();
      }
    });
  }

}
