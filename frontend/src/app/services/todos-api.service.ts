import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError} from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment"
// import { environment } from "../../environments/environment.prod"


@Injectable({
  providedIn: 'root'
})
export class TodosApiService {
  apiURL:string = environment.apiURL;
  token!:string;
  formdata = new FormData();
  requestHeader = new HttpHeaders({'No-Auth':'True'});

  constructor(private httpClient:HttpClient) { }

  getAuthenticated(loginData:any): Observable<any>{
    this.formdata.append('username', loginData.username);
    this.formdata.append('password',loginData.password);
    return this.httpClient.post(this.apiURL+'login',this.formdata, {
                                headers:this.requestHeader,}).pipe(
                                  catchError(this.handleError)
                                );
  }


  registerUser(userData:any):Observable<any>{
    return this.httpClient.post(this.apiURL+'users/',userData).pipe(
      catchError(this.handleError)
    );
  }


  getTodos():Observable<any>{
    return this.httpClient.get(this.apiURL+'todos').pipe(
      // tap(todos=>console.log('All',JSON.stringify(todos))),
      catchError(this.handleError)
    );
  }

  getTodosByID(id:number):Observable<any>{
    return this.httpClient.get(this.apiURL+'todos/'+id).pipe(
      // tap(todo=>console.log('All',JSON.stringify(todo))),
      catchError(this.handleError)
    );
  }

  

  getCategoryById(id:number):Observable<any>{
    return this.httpClient.get(this.apiURL+'category/'+id).pipe(
      // tap(categories_detail=>console.log('All',JSON.stringify(categories_detail))),
      catchError(this.handleError)
    );
  }

  getTodosByCategoryID(category:number):Observable<any>{
    return this.httpClient.get(this.apiURL+'todos/category/'+category).pipe(
      // tap(todos_details=>console.log('All',JSON.stringify(todos_details))),
      catchError(this.handleError)
    );
  }


  removeUserFromCategory(user_detail:any):Observable<any>{
    return this.httpClient.post(this.apiURL+'category/deleteUserFromCategory', user_detail).pipe(
      // tap(todos_details=>console.log('All',JSON.stringify(todos_details))),
      catchError(this.handleError)
    );
  }

  addUsertoCategory(user_detail:any):Observable<any>{
    return this.httpClient.post(this.apiURL+'category/addUserToCategory', user_detail).pipe(
      // tap(todos_details=>console.log('All',JSON.stringify(todos_details))),
      catchError(this.handleError)
    );
  }




  // used in Category Component
  getCategories():Observable<any>{
    return this.httpClient.get(this.apiURL+'category/').pipe(
      // tap(categories_detail=>console.log('All',JSON.stringify(categories_detail))),
      catchError(this.handleError)
    );
  }

  createCategory(category:any):Observable<any>{
    return this.httpClient.post(this.apiURL+'category/', category).pipe(
      // tap(todo_details=>console.log(todo_details)),
      catchError(this.handleError)
    );
  }

  deleteCategory(id:number):Observable<any>{
    return this.httpClient.delete(this.apiURL+'category/'+ id).pipe(
      // tap(todo_details=>console.log('All',JSON.stringify(todo_details))),
      catchError(this.handleError)
    );
  }

  updateCategory(id:number, category:any):Observable<any>{
    return this.httpClient.put(this.apiURL+'category/'+ id, category).pipe(
      // tap(todo_details=>console.log('All',JSON.stringify(todo_details))),
      catchError(this.handleError)
    );
  }
  //


  createTodos(todo:any):Observable<any>{
    return this.httpClient.post(this.apiURL+'todos/', todo).pipe(
      // tap(todo_details=>console.log('All',JSON.stringify(todo_details))),
      catchError(this.handleError)
    );
  }

  deleteTodos(id:number):Observable<any>{
    return this.httpClient.delete(this.apiURL+'todos/'+ id).pipe(
      // tap(todo_details=>console.log('All',JSON.stringify(todo_details))),
      catchError(this.handleError)
    );
  }

  updateTodos(id:number, todo:any):Observable<any>{
    return this.httpClient.put(this.apiURL+'todos/'+ id, todo).pipe(
      // tap(todo_details=>console.log('All',JSON.stringify(todo_details))),
      catchError(this.handleError)
    );
  }

  getUserById(id:number):Observable<any>{
    return this.httpClient.get(this.apiURL+'users/'+id).pipe(
      // tap(todo_details=>console.log('All',JSON.stringify(todo_details))),
      catchError(this.handleError)
    );
  }

  private handleError(err:HttpErrorResponse){
    let errMsg ='';
    if(err.error instanceof ErrorEvent){
      errMsg = `An error occured: ${err.error.message}`;
    }
    else{
      errMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errMsg);
    return throwError(()=>errMsg);
  }
}