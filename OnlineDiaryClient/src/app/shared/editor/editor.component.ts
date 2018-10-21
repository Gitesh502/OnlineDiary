import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../services/dialogbox/dialog-box.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editorContent: ElementRef;
  editorBody:string="";
  commands = [];
  imageSrc:any=[];
  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.fillCommands();
  }

  fillCommands() {
    this.commands = [
      { text: 'bold', showUI: false, value: '', fontIcon: 'fa-bold', title: 'Bold', display: true },
      { text: 'createLink', showUI: false, value: '', fontIcon: 'fa-link', title: 'Create Link', display: true },
      { text: 'copy', showUI: false, value: '', fontIcon: 'fa-copy', title: 'Copy', display: true },
      { text: 'cut', showUI: false, value: '', fontIcon: 'fa-cut', title: 'Cut', display: true },
      { text: 'delete', showUI: false, value: '', fontIcon: 'fa-trash-alt', title: 'Delete', display: true },
      { text: 'fontName', showUI: false, value: '', fontIcon: 'fa-font', title: 'Font Name', display: false },
      { text: 'fontSize', showUI: false, value: '', fontIcon: 'fa-font', title: 'Font Size', display: false },
      { text: 'foreColor', showUI: false, value: '', fontIcon: 'fa-font', title: 'Fore Color', display: false },
      { text: 'formatBlock', showUI: false, value: '', fontIcon: '', title: 'Format Black', display: false },
      { text: 'forwardDelete', showUI: false, value: '', fontIcon: '', title: 'Forward Delete', display: false },
      { text: 'insertHorizontalRule', showUI: false, value: '', fontIcon: 'fa-arrows-alt-h', title: 'Horizantal Rule', display: true },
      { text: 'insertHTML', showUI: false, value: '', fontIcon: '', title: 'Insert HTML', display: false },
      { text: 'insertImage', showUI: false, value: '', fontIcon: 'fa-image', title: 'Insert Image', display: true },
      { text: 'insertLineBreak', showUI: false, value: '', fontIcon: 'fa-long-arrow-alt-left', title: 'Line Break', display: true },
      { text: 'insertOrderedList', showUI: false, value: '', fontIcon: 'fa-list-ol', title: 'Ordered List', display: true },
      { text: 'insertUnorderedList', showUI: false, value: '', fontIcon: 'fa-list-ul', title: 'Unordered List', display: true },
      { text: 'insertParagraph', showUI: false, value: '', fontIcon: 'fa-paragraph', title: 'Paragraph', display: true },
      { text: 'insertText', showUI: false, value: '', fontIcon: '', title: 'Insert Text', display: false },
      { text: 'justifyCenter', showUI: false, value: '', fontIcon: 'fa-align-center', title: 'Justify Center', display: true },
      { text: 'justifyFull', showUI: false, value: '', fontIcon: '', title: 'Justify Full', display: false },
      { text: 'justifyLeft', showUI: false, value: '', fontIcon: 'fa-align-left', title: 'Justify Left', display: true },
      { text: 'justifyRight', showUI: false, value: '', fontIcon: 'fa-align-right', title: 'Justify Right', display: true },
      { text: 'outdent', showUI: false, value: '', fontIcon: 'fa-outdent', title: 'Outdent', display: true },
      { text: 'paste', showUI: false, value: '', fontIcon: 'fa-paste', title: 'Paste', display: true },
      { text: 'redo', showUI: false, value: '', fontIcon: 'fa-redo', title: 'Redo', display: true },
      { text: 'undo', showUI: false, value: '', fontIcon: 'fa-undo', title: 'Undo', display: true },
      { text: 'selectAll', showUI: false, value: '', fontIcon: 'fa-mouse-pointer', title: 'Select All', display: true },
      { text: 'strikethrough', showUI: false, value: '', fontIcon: 'fa-strikethrough', title: 'Strike through', display: true },
      { text: 'styleWithCss', showUI: false, value: '', fontIcon: '', title: 'Style with CSS', display: false },
      { text: 'superscript', showUI: false, value: '', fontIcon: 'fa-superscript', title: 'Superscript', display: true },
      { text: 'unlink', showUI: false, value: '', fontIcon: 'fa-unlink', title: 'Unlink', display: true },
      { text: 'useCSS', showUI: false, value: '', fontIcon: '', title: 'Use CSS', display: false },
    ];
  }

  executeCommand(command?: string, showUi?: boolean, value?: string) {
    switch (command) {
      case 'createLink':
        let url = prompt("Enter the URL");
        document.execCommand("createLink", false, url);
        break;
      case 'insertImage':
        this.openModal('c-imageUploader');
        break;
      default:
        document.execCommand(command, showUi, value);
        break;
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  changeColor() {
    var color = prompt("Enter your color in hex ex:#f1f233");
    document.execCommand("foreColor", false, color);
  }

  getImage(e) {
    let _this = this;
    var file = e.target.files[0];
    var reader = new FileReader();
    let dataURI;
    reader.addEventListener(
      "load",
      function () {
        dataURI = reader.result;
        const img = document.createElement("img");
        img.src = dataURI;
      
        _this.editorContent.nativeElement.appendChild(img);
      },
      false
    );
    if (file) {
      console.log("s");
      reader.readAsDataURL(file);
    }
  }

  setImages(){
    let _this = this;
    this.imageSrc.forEach(element => {
      const img = document.createElement("img");
      img.src = element;
      img.height = innerWidth=200;
      img.style.objectFit='contain';
      img.style.paddingRight='10px';
      this.editorBody = this.editorBody+img.outerHTML;
      _this.editorContent.nativeElement.appendChild(img);
    });
    this.closeModal('c-imageUploader');
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.imageSrc.push(reader.result);
      reader.readAsDataURL(file);
    }
  }

  printMe() {
    let _this = this;
    if (confirm("Check your Content before print")) {
      const body = document.body;
      let s = body.innerHTML;
      body.textContent = _this.editorContent.nativeElement.innerHTML;
      document.execCommand('ShowHelp');
      body.style.whiteSpace = "pre";
      window.print();
      location.reload();
    }
  }

  getEditorBody():string{
    return this.editorContent.nativeElement.innerHTML;
  }
}
