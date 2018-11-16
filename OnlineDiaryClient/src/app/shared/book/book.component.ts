import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  //templateUrl: './book.component.html',
  template: `
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
  BOOK_WIDTH = 1500;
  BOOK_HEIGHT = 800;
  PAGE_WIDTH = 720;
  PAGE_HEIGHT = 780;
  PAGE_Y = (this.BOOK_HEIGHT - this.PAGE_HEIGHT) / 2;
  CANVAS_PADDING = 60;
  page = 0;
  canvas: any;
  context;
  mouse = { x: 0, y: 0 };
  flips = [];
  book: any;
  pages: any;
  isInit: boolean = false;

  constructor() {
  }

  ngOnInit() {

  }

  trunPages() {
    this.initBookView();
    setTimeout(() => {
      for (let k = 0; k < 5; k++) {
        this.flips[k].dragging = true;
        if (this.mouse.x < 0) {
          this.flips[k].target = -1;
          this.flips[k].isInit = true;
          this.page = Math.min(this.page + 1, this.flips.length);
        }
        else {
          this.flips[k].target = 1;
          this.flips[k].isInit = true;
          this.page = Math.max(this.page - 1, 0);
        }
      }
    }, 1000)
  }

  initValues() {
    this.canvas = document.getElementById("pageflip-canvas");
    this.context = this.canvas.getContext("2d");
    this.book = document.getElementById("book");
    this.pages = this.book.getElementsByTagName("section")
  }

  initBookView() {
    this.initValues();
    for (var i = 0, len = this.pages.length; i < len; i++) {
      this.pages[i].style.zIndex = len - i;
      this.flips.push({
        progress: 1,
        target: 1,
        page: this.pages[i],
        dragging: false,
      });
    }
    this.canvas.width = this.BOOK_WIDTH + (this.CANVAS_PADDING * 2);
    this.canvas.height = this.BOOK_HEIGHT + (this.CANVAS_PADDING * 2);
    this.canvas.style.top = -this.CANVAS_PADDING + "px";
    this.canvas.style.left = -this.CANVAS_PADDING + "px";
    setInterval(() => {
      this.render();
      //  this.drawFlip(flip);
    }, 1000 / 60);
    document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
    document.addEventListener("mousedown", this.mouseDownHandler.bind(this), false);
    document.addEventListener("mouseup", this.mouseUpHandler.bind(this), false);
  }

  mouseMoveHandler(event) {
    this.mouse.x = event.clientX - this.book.offsetLeft - (this.BOOK_WIDTH / 2);
    this.mouse.y = event.clientY - this.book.offsetTop;
  }

  mouseDownHandler(event) {
    if (Math.abs(this.mouse.x) < this.PAGE_WIDTH) {
      if (this.mouse.x < 0 && this.page - 1 >= 0) {
        this.flips[this.page - 1].dragging = true;
      }
      else if (this.mouse.x > 0 && this.page + 1 < this.flips.length) {
        this.flips[this.page].dragging = true;
      }
    }
    this.canvas.style.zIndex = 100;
    if (event != null)
      event.preventDefault();
  }

  mouseUpHandler(event) {
    for (let i = 0; i < this.flips.length; i++) {
      if (this.flips[i].dragging) {
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
    let _this = this;
    _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
    for (let i = 0, len = this.flips.length; i < len; i++) {
      let flip = this.flips[i];
      if (flip.dragging) {
        if (flip.isInit) {
          debugger;
          flip.target = -1;
          //flip.isInit = false;
        }
        else {
          flip.target = Math.max(Math.min(_this.mouse.x / _this.PAGE_WIDTH, 1), -1);
          //this.isInit=false;
        }
      }
      if (flip.isInit) {
        flip.progress = -1;
      }
      else {
        flip.progress += (flip.target - flip.progress) * 0.2;
      }
      if (flip.dragging || Math.abs(flip.progress) < 0.997) {
        _this.drawFlip(flip);
      }
     
    }
  }

  drawFlip(flip) {
    let strength = 1 - Math.abs(flip.progress);
    let foldWidth = (this.PAGE_WIDTH * 0.5) * (1 - flip.progress);
    let foldX = this.PAGE_WIDTH * flip.progress + foldWidth;
    let verticalOutdent = 20 * strength;
    let paperShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
    let rightShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
    let leftShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
    flip.page.style.width = Math.max(foldX, 0) + "px";
    this.context.save();
    this.context.translate(this.CANVAS_PADDING + (this.BOOK_WIDTH / 2), this.PAGE_Y + this.CANVAS_PADDING);
    this.context.strokeStyle = 'rgba(0,0,0,' + (0.05 * strength) + ')';
    this.context.lineWidth = 30 * strength;
    this.context.beginPath();
    this.context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
    this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT + (verticalOutdent * 0.5));
    this.context.stroke();
    let rightShadowGradient = this.context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
    rightShadowGradient.addColorStop(0, 'rgba(0,0,0,' + (strength * 0.2) + ')');
    rightShadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.0)');
    this.context.fillStyle = rightShadowGradient;
    this.context.beginPath();
    this.context.moveTo(foldX, 0);
    this.context.lineTo(foldX + rightShadowWidth, 0);
    this.context.lineTo(foldX + rightShadowWidth, this.PAGE_HEIGHT);
    this.context.lineTo(foldX, this.PAGE_HEIGHT);
    this.context.fill();
    let leftShadowGradient = this.context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
    leftShadowGradient.addColorStop(0, 'rgba(0,0,0,0.0)');
    leftShadowGradient.addColorStop(1, 'rgba(0,0,0,' + (strength * 0.15) + ')');
    this.context.fillStyle = leftShadowGradient;
    this.context.beginPath();
    this.context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
    this.context.lineTo(foldX - foldWidth, 0);
    this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT);
    this.context.lineTo(foldX - foldWidth - leftShadowWidth, this.PAGE_HEIGHT);
    this.context.fill();
    let foldGradient = this.context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
    foldGradient.addColorStop(0.35, '#fafafa');
    foldGradient.addColorStop(0.73, '#eeeeee');
    foldGradient.addColorStop(0.9, '#fafafa');
    foldGradient.addColorStop(1.0, '#e2e2e2');
    this.context.fillStyle = foldGradient;
    this.context.strokeStyle = 'rgba(0,0,0,0.06)';
    this.context.lineWidth = 0.5;
    this.context.beginPath();
    this.context.moveTo(foldX, 0);
    this.context.lineTo(foldX, this.PAGE_HEIGHT);
    this.context.quadraticCurveTo(foldX, this.PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, this.PAGE_HEIGHT + verticalOutdent);
    this.context.lineTo(foldX - foldWidth, -verticalOutdent);
    this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
    this.context.fill();
    this.context.stroke();
    this.context.restore();
    flip.isInit = false;
  }
}
