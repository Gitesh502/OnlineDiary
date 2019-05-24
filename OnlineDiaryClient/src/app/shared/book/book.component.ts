import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  //templateUrl: './book.component.html',
  template:`
  <div class="book-view">
  <div id="book">
      <canvas id="pageflip-canvas"></canvas>
      <div id="pages">
        <ng-container *ngFor="let diary of dairiesList">
            <section>
                <div>
                  <span class="right">
                    <h4>{{diary.createdOn|date:'MMM d y'}}</h4>
                  </span>
                  <h2>{{diary.title}}</h2>
                  <p [innerHTML]="diary.body"></p>
                  <b>{{diary.pageNo}}</b>
                </div>
              </section>
        </ng-container>
      </div>
    </div>
</div>`,
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() isBookView: boolean = true;
  @Input() dairiesList: any;

  // Dimensions of the whole book
  BOOK_WIDTH = 1500;
  BOOK_HEIGHT = 800;

  // Dimensions of one page in the book
  PAGE_WIDTH = 720;
  PAGE_HEIGHT = 780;

  // Vertical spacing between the top edge of the book and the papers
  PAGE_Y = (this.BOOK_HEIGHT - this.PAGE_HEIGHT) / 2;

  // The canvas size equals to the book dimensions + this padding
  CANVAS_PADDING = 60;

  page = 0;

  canvas: any;
  context;

  mouse = { x: 0, y: 0 };

  flips = [];

  book: any;

  // List of all the page elements in the DOM
  pages: any;
  constructor() { 
   
  }

  ngOnInit() {
  }

  trunPages(){
    this.initBookView();
    for(let k=0;k<5;k++){
      this.flips[k].dragging = true;
      if (this.mouse.x < 0) {
        this.flips[k].target = -1;
        this.page = Math.min(this.page + 1, this.flips.length);
      }
      else {
        this.flips[k].target = 1;
        this.page = Math.max(this.page - 1, 0);
      }
      
  }
  }

  initValues() {
    this.canvas = document.getElementById("pageflip-canvas");
    this.context = this.canvas.getContext("2d");
    this.book = document.getElementById("book");
    this.pages = this.book.getElementsByTagName("section")
  }

  initBookView() {
    this.initValues();
    // Organize the depth of our pages and create the flip definitions
    for (var i = 0, len = this.pages.length; i < len; i++) {
      this.pages[i].style.zIndex = len - i;
   
      this.flips.push({
        // Current progress of the flip (left -1 to right +1)
        progress: 1,
        // The target value towards which progress is always moving
        target: 1,
        // The page DOM element related to this flip
        page: this.pages[i],
        // True while the page is being dragged
        dragging: false,
      });
     
    }
    //this.flips[currentPageNo].dragging=true;
    // Resize the canvas to match the book size
    this.canvas.width = this.BOOK_WIDTH + (this.CANVAS_PADDING * 2);
    this.canvas.height = this.BOOK_HEIGHT + (this.CANVAS_PADDING * 2);

    // Offset the canvas so that it's padding is evenly spread around the book
    this.canvas.style.top = -this.CANVAS_PADDING + "px";
    this.canvas.style.left = -this.CANVAS_PADDING + "px";

    // Render the page flip 60 times a second
    setInterval(()=>{
      this.render();
    }, 1000 / 60);
   
    document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
    document.addEventListener("mousedown", this.mouseDownHandler.bind(this), false);
    document.addEventListener("mouseup", this.mouseUpHandler.bind(this), false);
  }

  mouseMoveHandler(event) {
    // Offset mouse position so that the top of the book spine is 0,0
    //canvas.style.zIndex=100;
    this.mouse.x = event.clientX - this.book.offsetLeft - (this.BOOK_WIDTH / 2);
    this.mouse.y = event.clientY - this.book.offsetTop;
  }
  mouseDownHandler(event) {
    // Make sure the mouse pointer is inside of the book
    if (Math.abs(this.mouse.x) < this.PAGE_WIDTH) {
      if (this.mouse.x < 0 && this.page - 1 >= 0) {
        // We are on the left side, drag the previous page
        this.flips[this.page - 1].dragging = true;
      }
      else if (this.mouse.x > 0 && this.page + 1 < this.flips.length) {
        // We are on the right side, drag the current page
        this.flips[this.page].dragging = true;
      }
    }
    this.canvas.style.zIndex = 100;
    // Prevents the text selection
    if(event!=null)
    event.preventDefault();
  }



  mouseUpHandler(event) {
    for (var i = 0; i < this.flips.length; i++) {
      // If this flip was being dragged, animate to its destination
      if (this.flips[i].dragging) {
        // Figure out which page we should navigate to
        if (this.mouse.x < 0) {
          this.flips[i].target = -1;
          this.page = Math.min(this.page + 1, this.flips.length);
        }
        else {
          this.flips[i].target = 1;
          this.page = Math.max(this.page - 1, 0);
        }
      }

      this.flips[i].dragging = false;
      this.canvas.style.zIndex = 0;
    }
  }

  render() {
    let _this=this;
    // Reset all pixels in the canvas
    _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);

    for (var i = 0, len = this.flips.length; i < len; i++) {
      var flip = this.flips[i];

      if (flip.dragging) {
        flip.target = Math.max(Math.min(_this.mouse.x / _this.PAGE_WIDTH, 1), -1);
      }

      // Ease progress towards the target value 
      flip.progress += (flip.target - flip.progress) * 0.2;

      // If the flip is being dragged or is somewhere in the middle of the book, render it
      if (flip.dragging || Math.abs(flip.progress) < 0.997) {
        _this.drawFlip(flip);
      }

    }

  }

  drawFlip(flip) {
    // Strength of the fold is strongest in the middle of the book
    var strength = 1 - Math.abs(flip.progress);

    // Width of the folded paper
    var foldWidth = (this.PAGE_WIDTH * 0.5) * (1 - flip.progress);

    // X position of the folded paper
    var foldX = this.PAGE_WIDTH * flip.progress + foldWidth;

    // How far the page should outdent vertically due to perspective
    var verticalOutdent = 20 * strength;

    // The maximum width of the left and right side shadows
    var paperShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
    var rightShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
    var leftShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);


    // Change page element width to match the x position of the fold
    flip.page.style.width = Math.max(foldX, 0) + "px";

    this.context.save();
    this.context.translate(this.CANVAS_PADDING + (this.BOOK_WIDTH / 2), this.PAGE_Y + this.CANVAS_PADDING);


    // Draw a sharp shadow on the left side of the page
    this.context.strokeStyle = 'rgba(0,0,0,' + (0.05 * strength) + ')';
    this.context.lineWidth = 30 * strength;
    this.context.beginPath();
    this.context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
    this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT + (verticalOutdent * 0.5));
    this.context.stroke();


    // Right side drop shadow
    var rightShadowGradient = this.context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
    rightShadowGradient.addColorStop(0, 'rgba(0,0,0,' + (strength * 0.2) + ')');
    rightShadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.0)');

    this.context.fillStyle = rightShadowGradient;
    this.context.beginPath();
    this.context.moveTo(foldX, 0);
    this.context.lineTo(foldX + rightShadowWidth, 0);
    this.context.lineTo(foldX + rightShadowWidth, this.PAGE_HEIGHT);
    this.context.lineTo(foldX, this.PAGE_HEIGHT);
    this.context.fill();


    // Left side drop shadow
    var leftShadowGradient = this.context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
    leftShadowGradient.addColorStop(0, 'rgba(0,0,0,0.0)');
    leftShadowGradient.addColorStop(1, 'rgba(0,0,0,' + (strength * 0.15) + ')');

    this.context.fillStyle = leftShadowGradient;
    this.context.beginPath();
    this.context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
    this.context.lineTo(foldX - foldWidth, 0);
    this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT);
    this.context.lineTo(foldX - foldWidth - leftShadowWidth, this.PAGE_HEIGHT);
    this.context.fill();


    // Gradient applied to the folded paper (highlights & shadows)
    var foldGradient = this.context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
    foldGradient.addColorStop(0.35, '#fafafa');
    foldGradient.addColorStop(0.73, '#eeeeee');
    foldGradient.addColorStop(0.9, '#fafafa');
    foldGradient.addColorStop(1.0, '#e2e2e2');

    this.context.fillStyle = foldGradient;
    this.context.strokeStyle = 'rgba(0,0,0,0.06)';
    this.context.lineWidth = 0.5;

    // Draw the folded piece of paper
    this.context.beginPath();
    this.context.moveTo(foldX, 0);
    this.context.lineTo(foldX, this.PAGE_HEIGHT);
    this.context.quadraticCurveTo(foldX, this.PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, this.PAGE_HEIGHT + verticalOutdent);
    this.context.lineTo(foldX - foldWidth, -verticalOutdent);
    this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);

    this.context.fill();
    this.context.stroke();


    this.context.restore();
  }
}
