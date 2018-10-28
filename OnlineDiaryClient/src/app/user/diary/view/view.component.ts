import { Component, OnInit, ViewChild } from '@angular/core';
import { DiaryService } from '../services/diary.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { UtilityService } from 'src/app/shared/services/utility/utility.service';
import { ModalService } from 'src/app/shared/services/dialogbox/dialog-box.service';
import { BookComponent } from 'src/app/shared/book/book.component';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild(BookComponent) book:BookComponent;
  settings = {
    columns: {
      title: {
        title: 'Title'
      },
      pageNo: {
        title: 'Page No'
      },
      createdOn: {
        title: 'Created On'
      },
    },
    actions: {
      add: false,
      delete: false,
    }
  };
  isBookView: boolean = false;
  tableData: LocalDataSource = new LocalDataSource();


  constructor(
    private diaryService: DiaryService,
    public msgService: MessageService,
    private datePipe: DatePipe,
    public utility: UtilityService,
    private modalService: ModalService
  ) { }
  dairiesList: any[] = [];
  ngOnInit() {
    this.get();
  }

  initDiaryList() {

  }
  get() {
    this.msgService.setLoading(true);
    this.diaryService.get()
      .subscribe((data: any) => {
        if (data.valid) {
          data.response.forEach(element => {
            this.dairiesList.push({
              id: element.id,
              title: element.title,
              createdOn: this.datePipe.transform(element.createdOn, 'MMM d y'),
              body: element.body,
              pageNo: element.pageNo

            });
          });
          this.tableData.load(this.dairiesList);
        }
        else {
          this.msgService.show(false, data.msg);
        }
          this.msgService.setLoading(false);
      },err=>{
          this.msgService.setLoading(false);
        this.msgService.show(false, "Error Occured");
      })
  }

  showBook() {
    this.isBookView = true;
    this.openModal('c-book-view')
    this.book.trunPages();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  

}
