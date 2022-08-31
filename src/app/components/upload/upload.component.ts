import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() onAddImage: EventEmitter<Task> = new EventEmitter()
  @Output() onLoadImage:EventEmitter<any> = new EventEmitter()
  showAddImage:boolean = true;
  localy:boolean = false;
  internet:boolean = false;
  address:string = "";
  subscription: Subscription;

  constructor(private imageService: ImageService) { 
    this.subscription = this.imageService.onToggle().subscribe(value => this.showAddImage = value)
  }

  ngOnInit(): void {
  }
  uploadImage():void {
    this.onAddImage.emit();
  }
  onSubmit(){
    // const cur
    if(!this.address){
      alert('please add a address');
    }
    const cur_address = this.address;
    this.onLoadImage.emit(cur_address);
    this.address = '';
    
  }

}
