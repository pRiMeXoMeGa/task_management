import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TodosApiService } from '../services/todos-api.service';

@Component({
  selector: 'td-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit, OnDestroy {

  // listfilter:[]=[];
  pageTitle: string = "Category List";
  filteredCategory: any={};
  categoryList: any={};
  
  category!: number|null;
  addCategoryClicked:boolean=false;
  addUserToCate:boolean=false;
  
  toggleAddUser!:number;
  toggleModel!:number;
  isShared:boolean=false;
  addUserEmail:string="";

  private _listFilter: string= '';
  private _addCategory: string = '';
  private _editedCategory:string='';
  
  sub!: Subscription;

  constructor(private todosApiService:TodosApiService, 
              private activedRoute: ActivatedRoute, 
              private router:Router
              ) { }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredCategory = this.performFilter(value);
  }

  get editedCategory():string{
    return this._editedCategory;
  }
  set editedCategory(value:string){
    this._editedCategory = value;
  }

  get addCategory():string{
    return this._addCategory;
  }
  set addCategory(value:string){
    this._addCategory = value;
  }

  ngOnInit(): void {
    this.sub = this.getCategoryList();
  }

  getCategoryList():Subscription{
    return this.todosApiService.getCategories().subscribe({
                next: (res:any) => {
                    this.categoryList = res;
                    this.filteredCategory = this.categoryList.categories;
                    console.log(this.filteredCategory);
                },
                error: (err:any)=>{
                  alert(err);
                  this.router.navigate(['/user/category']);
                }
              }
            );
  }

  updateCategory(id:number, category:any){
    this.todosApiService.updateCategory(id, category).subscribe({
      next: (res:any)=>{
        this.ngOnInit();
        this.toggleModel = 0;
        this._editedCategory = "";
      },
      error: err=> {
        console.log(err);
        alert(err);
        this.router.navigate(['./user/category']);
      },
    });
  }

  onSubmitCategory():void{
    let sharedWith:any = [];
    if(this.addUserEmail!="")
      sharedWith =  [this.addUserEmail.toLocaleLowerCase()];
    const json_object_of_category = {
      "category":this.addCategory,
      "sharedWith":sharedWith,
      "isShared":this.isShared
    }
    this.todosApiService.createCategory(json_object_of_category).subscribe({
      next: (res:any) =>{
        this.categoryList.categories.push(res);
        this.filteredCategory = this.categoryList.categories;
        this._addCategory = "";
        this.isShared = false;
        this.addUserEmail = "";
      },
      error: (err:any)=>{
        alert(err);
        this.router.navigate(['/user/category']);
      }
    });
    this.addCategoryClicked = !this.addCategoryClicked;
  }

  onDelete(id:number):void{
    this.todosApiService.deleteCategory(id).subscribe({
      next: () => {
        this.categoryList.categories = this.performDelete(id);
        this.filteredCategory = this.categoryList.categories;
      },
      error: err => {
        alert(err);
        this.router.navigate(['./user/category']);
      }
    });

  }  

  onUpdate(id:number):void{
    const json_object_of_category = {
      "category":this.editedCategory,
      "isShared":this.isShared
    };
    this.updateCategory(id,json_object_of_category);
  }
 
  deleteUserFromCategory(user_id:any, category_id:number):void{
    const user_detail = {
      "user_id":user_id,
      "category_id":category_id
    }
    this.todosApiService.removeUserFromCategory(user_detail).subscribe({
      next: ()=>{
        this.ngOnInit();
      },
      error:err=>{
        alert(err);
        this.router.navigate(['./user/category']);
      }
    });
  }


  addUserToCategory( category_id:number, category_name:string):void{
    this.addUserToCate = !this.addUserToCate
    this.toggleAddUser = category_id;
    const user_detail = {
      "user_id":this.addUserEmail,
      "category_id":category_id
    }
    this.todosApiService.addUsertoCategory(user_detail).subscribe({
      next: ()=>{
        this.addUserEmail="";
        const json_object_of_category = {
          "category":category_name,
          "isShared":true
        };
        this.updateCategory(category_id,json_object_of_category);
        this.ngOnInit();
      },
      error:err=>{
        alert(err);
        this.router.navigate(['./user/category']);
      }
    });
  }


  onAddCategoryBtn():void{
    this.addCategoryClicked = !this.addCategoryClicked;
  }

  toggleAddUserToCate(id:number):void{
    this.addUserToCate = !this.addUserToCate;
    this.toggleAddUser = id;
  }

  toggleEdit(id:number):void{
    this.toggleModel = id;
  }

  toggleEditDisable():void{
    this.toggleModel = 0;
  }

  toggleAddUserDisable():void{
    this.toggleAddUser = 0;
  }

  performFilter(filterBy:string):any{
    filterBy = filterBy.toLocaleLowerCase();
    return this.categoryList.categories.filter((category:any)=> 
           category.category.toLocaleLowerCase().includes(filterBy));
  }

  // performUpdate(id:number, categoryy:any):any{
  //   return this.categoryList.categories.filter((category:any)=>{
  //     if(category.id==id){
  //       category = categoryy;
  //     }
  //   });
  //   // for( let i = 0; i<this.categoryList.categories.length;i++){
  //   //   if(this.categoryList.categories.Category[i].id==id){
  //   //     this.categoryList[i] = category;
  //   //   }
  //   // }
  //   // return this.categoryList;
  // }

  performDelete(id:number):any{
    return this.categoryList.categories.filter((category:any) => category.id!=id);
  }

  
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
