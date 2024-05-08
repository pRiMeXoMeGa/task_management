import { Component } from '@angular/core';
import { UtilsService } from './services/utils.service'
@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Todo List Application';
  sideNavTaskList= [
                    // {
                    //   "category":"TodoLists",
                    //   "icon":"list",
                    //   "url":"user/todoslist"
                    // },
                    {
                      "category":"Category",
                      "icon":"category",
                      "url":"user/category"
                    }  
                  ];
  constructor(public utils:UtilsService){}
  public getVisible():boolean{
    return this.utils.getsideNav();
  }

  public getUserName():string{
    return this.utils.getToken().username;
  }

  public logout(){
    this.utils.logout();
  }
}
