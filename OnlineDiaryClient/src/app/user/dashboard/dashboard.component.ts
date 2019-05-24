import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/services/task.service';
import { DiaryService } from '../diary/services/diary.service';
import { Router } from '@angular/router';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  showCalender:any={
    loadDiary:false,
    loadTasks:false
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;
  constructor(
    private diary: DiaryService, 
    private tasks: TaskService,
    private router:Router) { }

  ngOnInit() {
    this.getDiaries();
    this.getTasks();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
    console.log(event);
    if(event.meta=='Tasks'){
      this.router.navigate(['/user/task/add', event.id]);
    } 
    if(event.meta=="Diary"){
      this.router.navigate(['/user/diary/add', event.id]);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getDiaries() {
    this.diary.get()
      .subscribe((result: any) => {
        if (result && result.valid) {
          result.response.forEach((diary: any) => {
            this.events.push({
              id:diary.pageNo,
              meta:'Diary',
              start: new Date(diary.createdOn),
              end: null,
              title: diary.title,
              color: colors.red,
              allDay: true,
              resizable: {
                beforeStart: false,
                afterEnd: false
              },
              draggable: false
            })
          })
          setTimeout(()=>{
            this.showCalender.loadDiary = true;
          },2000)
        }
      });
  }

  getTasks() {
    this.tasks.get()
      .subscribe((result: any) => {
        if (result && result.valid) {
          result.response.forEach((task: any) => {
            this.events.push({
              id:task.id,
              meta:'Tasks',
              start: new Date(task.startDate),
              end: new Date(task.endDate),
              title: task.title,
              color: colors.yellow,
              allDay: true,
              resizable: {
                beforeStart: false,
                afterEnd: false
              },
              draggable: false
            })
          });
          setTimeout(()=>{
            this.showCalender.loadTasks = true;
          },2000)
        }
      });
  }


}
