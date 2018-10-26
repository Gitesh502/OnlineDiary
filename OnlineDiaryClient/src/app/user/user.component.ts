import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { StorageService } from '../shared/services/storage/storage.service';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/services/utility/utility.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  items = [];
  contextTtems = [];
  constructor(
    private sidebarService: NbSidebarService,
    private storage: StorageService,
    private nbMenuService: NbMenuService,
    private authService: AuthService,
    private router: Router,
    public utility: UtilityService
  ) { }

  ngOnInit() {
    this.initMenu();
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      });

  }
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  initMenu() {
    this.items = [
      {
        title: 'Diary',
        expanded: false,
        icon: 'fa fa-book',
        children: [
          {
            title: 'Add',
            link: ['diary/add'], // goes into angular `routerLink`
          },
          {
            title: 'View',
            link: ['diary/view'], // goes directly into `href` attribute
          }
        ],
      },
      {
        title: 'Tasks',
        icon: 'fa fa-tasks',
        link: [],
        children: [
          {
            title: 'Add',
            link: []
          },
          {
            title: 'View',
            link: []
          }
        ]
      },
      {
        title: 'Logout',
        icon: 'fa fa-sign-out-alt',
        link: [],
      },
    ];
    this.contextTtems = [
      { title: 'Profile' },
      { title: 'Logout' },
    ];
  }

  getUser(): any {
    return this.storage.get('user').user;
  }

  toggleView(view) {
    this.utility.diaryViewType = view;
  }

  showMenuOpts(type) {
    switch (type) {
      case 'diaryListView':
        if (this.getUrl().indexOf("diary/view") > -1)
          return true;
        return false;
    }
  }

  getUrl(): string {
    return this.router.url;
  }
}
