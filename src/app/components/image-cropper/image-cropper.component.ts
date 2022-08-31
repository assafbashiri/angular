import { Component, OnInit, Output,EventEmitter, ViewChild, HostListener,Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router'
import { ImageService } from 'src/app/services/image.service';
import { CanvasComponent } from '../canvas/canvas.component';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
// import { deepStrictEqual } from 'assert';
// import { type } from 'os';
var Gimg:any = undefined;
var count = 0;



@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent implements OnInit {
  // @HostListener('document:mousemove', ['$event']) 
  // onMouseMove(e) {
  //   console.log(e);
  //   // console.log(e['clientY']);
  //   if (typeof Gimg !== 'undefined'){
  //     console.log("in");
  //     var img = document.getElementById(Gimg.id);
  //     if (e['clientY'] >= 100 && e['clientY'] < 600 + parseInt(img.style.height)){
  //       var s = parseInt(e['clientY']);
        
  //       img.style.top = s.toString() +'px';
  //       // img.parentElement.style.top = s.toString() +'px';
  //     }
  //     if (e['clientX'] >= 0 && e['clientX'] < 1000-parseInt(img.style.width.slice(0,-2))){
  //       var s = parseInt(e['clientX']);
  //       img.style.left = s.toString()+'px';
  //       // img.off.style.left = s.toString()+'px';
  //     }
  //   }
  // }
  
  showAddImage: boolean = false;
  subscription: Subscription;
  @Output() upload: EventEmitter<any> = new EventEmitter()
  @ViewChild("mycanvas") mycanvas;
  constructor(private imageService: ImageService, private router:Router) {
    this.subscription = imageService.onToggle().subscribe(value => this.showAddImage = value)
    document.ondblclick = function(){
      Gimg.style.border = "0px solid black";
      Gimg = undefined;
    }
   }

  ngOnInit(): void {
  }
  toggleAddImage(){
    console.log("toggleAddImage ImageCropper");
    console.log(this.showAddImage)
    this.imageService.toggleAddImage();
  }
  addImage():void {
    console.log("addImage- ImageCropper");
    console.log("wow2");
  }
  uploadImage() {
    console.log("uploadImage   ImageCropper")
    console.log("wow")
  }
  
  preview(e):void {
    let canvas = this.mycanvas.nativeElement;
    let context = canvas.getContext('2d');
    // context.clearRect(0,0,300,300);

    var render = new FileReader();
    render.onload = function(event) {
      // var canva = new Canvas()
      var can = document.createElement("canvas")
      can.width = 100;
      can.height = 100
      var img = new Image();

      img.onload = function(){
        context.save()
        context.drawImage(img,500,350);
        context.restore()
      };
      img.src = event.target.result.toString();
    };
    render.readAsDataURL(e.target.files[0]);
  };


  restore(e):void {
    let canvas = this.mycanvas.nativeElement;
    let context = canvas.getContext('2d');
      }
   
    
  GFG_Fun(e) {
    console.log("hey");
    var up = document.getElementById('GFG_UP'); 
    // up.innerHTML = "Click on the button to add image element"; 
    var down = document.getElementById('GFG_DOWN');
    var img = document.createElement('img');
    var div = document.createElement('div');
    var canvas = document.createElement('canvas');

    // var render = new FileReader();
    
    // render.onload = function(event) {
    //   console.log("load");
    // };
    img.id = count.toString();
    count +=1

    // img.src  = render.readAsDataURL;
    var reader = new FileReader();
    reader.readAsDataURL(document.forms['form1']['in1'].files[0]);
    reader.onloadend = function(){
      img.src = reader.result.toString();
      var ball = div;
      img.onmousedown = function(event) {


        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;
      
        ball.style.position = 'absolute';
        ball.style.zIndex = '1000';
        document.body.append(ball);
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into accountz
        function moveAt(pageX, pageY) {
          var h = parseInt(img.style.height);
          var w = parseInt(img.style.width);
          console.log("w= : "+w+" h= : "+h);
          if (pageX - shiftX >= window.innerWidth*0.1 && pageX - shiftX <= window.innerWidth*0.9-w){
          ball.style.left = pageX - shiftX + 'px';
          }
         if (pageY - shiftY >= 100 && pageY - shiftY <= 600-h){
        ball.style.top = pageY - shiftY + 'px';
         }
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        document.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          document.onmouseup = null;
        };
      
      };
      
      ball.ondragstart = function() {
        return false;
      };


      img.onclick = function(){
        console.log("not the same");
        
        
        // const index = Gimg.indexOf(img,0);
        // if (index < 0){
          // Gimg.push(img);
        // }
        console.log("Gimg is now"+div);
        if(Gimg == div){
          Gimg = undefined;
          img.style.border = "0px solid black";
          while(parseInt(img.style.height)+img.parentElement.offsetTop+20 > 500){
            console.log('try');
            var s = img.style.height;
            var c = s.slice(0,-2);
            var n = parseInt(c);
            img.style.height = (n-1).toString()+'px' ;
            // img.style.top = img.parentElement.offsetTop.toString();
            // img.style.top = "0";grg
            
          }
        }
        else{
          Gimg = div;
          img.style.border = "3px solid black";
        }
      }
      // img.ondblclick = function(){
      //   const idx = Gimg.indexOf(img,0);
      //   if (idx > -1){
      //     console.log(Gimg);
      //     // Gimg.slice(idx,idx+1);
      //     // delete Gimg[idx]
      //     Gimg.splice(idx,1);
      //     console.log(Gimg);
      //     console.log("the same");
      //     img.style.border = "0px solid black";
      //   }
      // }
      div.style.setProperty('position','absolute');
      div.style.setProperty('position','absolute');
      // canvas.style.setProperty('position','absolute');

      div.style.setProperty('height', '100px');
      img.style.setProperty('height', '80px');
      // canvas.style.setProperty('height', '80px');

      div.style.setProperty('width', '100px');
      img.style.setProperty('width', '80px');
      // canvas.style.setProperty('width', '80px');

      div.style.setProperty('right','0px');
      img.style.setProperty('right','0px');
      // canvas.style.setProperty('right','0px');

      div.style.setProperty('left','0px');
      img.style.setProperty('left','0px');
      // canvas.style.setProperty('left','0px');

      div.style.setProperty('top','0px');
      img.style.setProperty('top','0px');
      // canvas.style.setProperty('top','0px');

      div.style.setProperty('draggable','true');
      img.style.setProperty('draggable','true');
      // canvas.style.setProperty('draggable','true');

      
      var btn1 = document.createElement('button');
      btn1.innerText = '-';
      btn1.onclick = function(){
        var h = parseInt(div.style.height);
        var w = parseInt(div.style.width);
        
        img.style.height = (h-10).toString()+'px';
        img.style.width = (w-10).toString()+'px';
        
      }

      var btn2 = document.createElement('button');
      btn2.innerText = '+'
      btn2.onclick = function(){
        // var parent = document.getElementById('container')
        var h = parseInt(img.style.height);
        var w = parseInt(img.style.width);
        var b = parseInt(img.style.bottom);
        var top = parseInt(img.style.top);
        var top1 = img.parentElement.offsetTop;
        var top2 = img.offsetHeight;
        var right = parseInt(img.style.right);
        console.log('h='+(h+20)+' w='+(w+20)+' b='+b+' top='+top2+' right='+right);
        console.log(top1);
        if (top1+h+20 <= 500){
          img.style.height = (h+20).toString()+'px';
          img.style.width = (w+20).toString()+'px';
          // img.style.width = (w+5).toString()+'px';
        }
      }

      var btn3 = document.createElement('button')
      btn3.innerText = 'ROTATE'
      btn3.onclick = function(){
        const num = parseInt(img.id);
      // var img = document.getElementById(num);
        // var ctx = document.getElementById(num*1000)        
    //   var r = img.style.rotate;
    //   console.log();
    //   console.log(typeof(r));
    //   if (r == '0deg' || r == ''){
    //     img.style.rotate = '90deg';
    //   }
    //   else if ( r == '90deg'){
    //     img.style.rotate = '180deg';
    //   }
    //   else if ( r == '180deg'){
    //     img.style.rotate = '270deg';
    //   }
    //   else if ( r == '270deg'){
    //     img.style.rotate = '0deg';
    // }
      }

      var btn4 = document.createElement('button')
      btn4.innerText = 'X'
      btn4.onclick = function(){
      var id = img.id+'00'
      div.remove();
      }

      
      
      canvas.id = (count*1000).toString();
      var ctx = canvas.getContext('2d');
      img.onload = function() {
        ctx.drawImage(img, 0, 0, 100, 100);
      }
      // ctx.drawImage(img,0,0,100,100)
      div.id = (count*100).toString();
      div.appendChild(btn1);
      div.appendChild(btn2);
      div.appendChild(btn3);
      div.appendChild(btn4); 
      div.appendChild(canvas);
      // ctx.rotate(45);
      document.getElementById('container').appendChild(div);
      // document.getElementById('container').appendChild(img);
      // down.innerHTML = "Image Element Added."; 
    }

    var file = document.forms['form1']['in1'].files[0];
    console.log("turn")
    console.log(file);
    
  }

  up(){
    Gimg.forEach((im)=>{
      const num = im.id;
      var img = document.getElementById(num);
      if (img.style.top == ''){
        img.style.top = '0px';
      }
      var s = img.style.top;
      var c = s.slice(0,-2);
      var n = parseInt(c);
      console.log(n);
      var cont = document.getElementById('container');
      var t = parseInt(cont.style.top.slice(0,-2));
      if((n-10) >= 0){
      img.style.top = (n-10).toString()+'px';
      }
    });
  }
  down(){
    Gimg.forEach((im)=>{
      const num = im.id;
      var img = document.getElementById(num);
      if (img.style.top == ''){
        console.log("fucking in");
        img.style.top = '0px';
      }
      var s = img.style.top;
      var c = s.slice(0,-2);
      var n = parseInt(c);
      // console.log(n);
      var size = img.style.height;
      console.log(parseInt(size));
      console.log(typeof(size));
      // console.log(img.style.minHeight);
      // console.log(img.style.maxHeight);
      if((n+10+parseInt(size)) <= 500){
        img.style.top = (n+10).toString()+'px';
        }
      
    });
  }
  left(){
    Gimg.forEach((im)=>{
      const num = im.id;
      var img = document.getElementById(num);
      if (img.style.right == ''){
        var cont = document.getElementById('container');
        
        img.style.right = ((window.innerWidth)-1000).toString()+'px';
      }
      var s = img.style.right;
      var c = s.slice(0,-2);
      var n = parseInt(c);
      console.log(n);
      if((n+50 + parseInt(img.style.width)) <= 1000){
        img.style.right = (n+50).toString()+'px';
        }
    });
  }
  right(){
    Gimg.forEach((im)=>{
      const num = im.id;
      var img = document.getElementById(num);
      if (img.style.right == ''){
        img.style.right = '0px';
      }
      var s = img.style.right;
      var c = s.slice(0,-2);
      var n = parseInt(c);
      console.log(n);
      if((n-50) >= 0){
        img.style.right = (n-50).toString()+'px';   
      }
    });
  }

  zooom_in(){
    Gimg.forEach((img)=>{

      var h = parseInt(img.style.height);
      var w = parseInt(img.style.width);
      var top = parseInt(img.style.top);
      var right = parseInt(img.style.right);
      if (top+h <= 500 && right-w/2 >=-500 && right -w/2<=500){
        img.style.height = (h+10).toString()+'px';
        img.style.width = (w+10).toString()+'px';
      }
    });
  }

  zooom_out(){
    Gimg.forEach((img)=>{

      var h = parseInt(img.style.height);
      var w = parseInt(img.style.width);
      
      img.style.height = (h-10).toString()+'px';
      img.style.width = (w-10).toString()+'px';
    });
  }

  rotate_right(){
    Gimg.forEach((im)=>{
      const num = im.id;
      var img = document.getElementById(num);
      var r = img.style.rotate;
      console.log();
      console.log(typeof(r));
      if (r == '0deg' || r == ''){
        img.style.rotate = '90deg';
      }
      else if ( r == '90deg'){
        img.style.rotate = '180deg';
      }
      else if ( r == '180deg'){
        img.style.rotate = '270deg';
      }
      else if ( r == '270deg'){
        img.style.rotate = '0deg';
    }
    });
    
  }

  rotate_left(){
    Gimg.forEach((im)=>{
      const num = im.id;
      var img = document.getElementById(num);
      var r = img.style.rotate;
      console.log();
      console.log(typeof(r));
      if (r == '0deg' || r == ''){
        img.style.rotate = '270deg';
      }
      else if ( r == '270deg'){
        img.style.rotate = '180deg';
      }
      else if ( r == '180deg'){
        img.style.rotate = '90deg';
      }
      else if ( r == '90deg'){
        img.style.rotate = '0deg';
      }
    });
  }

};

