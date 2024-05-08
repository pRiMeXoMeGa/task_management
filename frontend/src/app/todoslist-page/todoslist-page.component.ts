// import { UtilsService } from './../services/utils.service';
// import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosApiService } from '../services/todos-api.service';

@Component({
  selector: 'td-todoslist-page',
  templateUrl: './todoslist-page.component.html',
  styleUrls: ['./todoslist-page.component.css']
})
export class TodoslistPageComponent implements OnInit {

  pageTitle: string= "TodoList";
  
  filteredTodo: any={};
  todoList!: any;
  
  category!: number|null;
  btnStyle: number = 4;
  
  addTodoClicked:boolean=false;
  toggleModel!:number;

  private _listFilter: string= '';
  private _listStatusFilter: string= 'All';
  private _addTodo: string = '';
  private _addDesc: string = '';
  private _editedTodo:string='';
  private _editedDesc:string='';
  private _editedStatus:string='Select';

  // sub!: Subscription;

  constructor(private todosApiService:TodosApiService, 
              private activedRoute: ActivatedRoute, 
              private router:Router,
              // private utils:UtilsService
              ) { }
  
  get editedTodo():string{
    return this._editedTodo;
  }
  set editedTodo(value:string){
    this._editedTodo = value;
  }
  
  get editedDesc():string{
    return this._editedDesc;
  }
  set editedDesc(value:string){
    this._editedDesc = value;
  }

  get editedTodoStatus():string{
    return this._editedStatus;
  }
  set editedTodoStatus(value:string){
    this._editedStatus = value;
  }

  get addTodo():string{
    return this._addTodo;
  }
  set addTodo(value:string){
    this._addTodo = value;
  }
  
  get addDesc():string{
    return this._addDesc;
  }
  set addDesc(value:string){
    this._addDesc = value;
  }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredTodo = this.performFilter(value);
  }
  
  get listStatusFilter(): string{
    return this._listStatusFilter;
  }
  set listStatusFilter(value: string){
    this._listStatusFilter = value;
    this.filteredTodo = this.performStatusFilter(value);
  }
  
  ngOnInit(): void {
    this.category= Number(this.activedRoute.snapshot.paramMap.get('category'));
    this.todosApiService.getCategoryById(this.category).subscribe({
      next: (res)=>{
        // this.pageTitle=`${res.category} ` + this.pageTitle;
        this.pageTitle = res.category;
      },
      error: err=>{
        alert(err);
        this.router.navigate(['./user/category/'+this.category]);
      }
    });
    
    if(this.category!=null){
      this.getTodosByCategory(this.category);
    }
  }

  getTodosByCategory(category:number){
    this.todosApiService.getTodosByCategoryID(category).subscribe({
      next: (res:any) => {
          this.todoList = res.todos;
          this.filteredTodo = this.todoList;
      },
      error: err => console.log(err)
    });
  }

  updateTodo(id:number, todo:any, func:string){
    this.todosApiService.updateTodos(id, todo).subscribe({
      next: (res:any)=>{
        this.todoList = this.performUpdate(id, res);
        this.filteredTodo = this.todoList;
        if(func==="update"){
          this.toggleModel = 0;
          this._editedTodo = "";
          this._editedStatus = "";
          this._editedDesc = "";
        }
      },
      error: err=> {
        alert(err);
        this.router.navigate(['./user/category/'+this.category]);
      },
    });
  }
  
  onSubmitTodo():void{
    const json_object_of_todo = {
      "todo":this.addTodo,
      "description":this.addDesc,
      "category":this.category
    }
    this.todosApiService.createTodos(json_object_of_todo).subscribe({
      next: (res:any) =>{
        this.todoList.push(res);
        this.filteredTodo = this.todoList;
        this._addTodo = "";
      },
      error: err=> {
        alert(err);
        this.router.navigate(['./user/category/'+this.category]);
      },
    });
    this.addTodoClicked = !this.addTodoClicked;
  }

  onDelete(id:number):void{
    this.todosApiService.deleteTodos(id).subscribe({
      next: () => {
        this.todoList = this.performDelete(id);
        this.filteredTodo = this.todoList;
      },
      error: err => {
        alert(err);
        this.router.navigate(['./user/category/'+this.category]);
      },
    });

  }  

  onUpdate(id:number):void{
    const json_object_of_todo = {
      "todo":this.editedTodo,
      "description":this.editedDesc,
      "category":this.category,
      "status":this.editedTodoStatus
    };
    const func = "update"
    this.updateTodo(id,json_object_of_todo, func);
  }

  markCompleted(id:number, todo:string, description:string){
    const json_object_of_todo = {
      "todo":todo,
      "category":this.category,
      "description":description,
      "status":this.editedTodoStatus
    };
    const func = "mark_complete"
    this.updateTodo(id, json_object_of_todo, func);
  }
 
  onAddTodoBtn():void{
    this.addTodoClicked = !this.addTodoClicked;
  }

  toggleEdit(id:number):void{
    this.toggleModel = id;
  }

  toggleEditDisable():void{
    this.toggleModel = 0;
  }

  onBack():void{
    this.router.navigate(['/user/category']);
  }

  performFilter(filterBy:string):any{
    filterBy = filterBy.toLocaleLowerCase();
    return this.todoList.filter((todo:any)=>
        todo.todo.toLocaleLowerCase().includes(filterBy));
  }
  
  performStatusFilter(filterBy:string):any{
    if(filterBy=='All')
      return this.todoList;
    filterBy = filterBy.toLocaleLowerCase();
    return this.todoList.filter((todo:any)=>
        todo.status.toLocaleLowerCase().includes(filterBy));
  }

  performUpdate(id:number, todoo:any):any{
    for( let i = 0; i<this.todoList.length;i++){
      if(this.todoList[i].id==id){
        this.todoList[i] = todoo;
      }
    }
    
    return this.todoList;
  }

  performDelete(id:number):any{
    return this.todoList.filter((todo:any)=>todo.id!=id);
  }

  doNothing():void{
  }

  //  ngOnDestroy(){
  //   this.utils.destroy(this.sub);
  //  }
}
