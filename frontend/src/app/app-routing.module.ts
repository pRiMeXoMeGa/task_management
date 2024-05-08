import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { CategoryPageComponent } from './category-page/category-page.component'
import { TodoslistPageComponent } from './todoslist-page/todoslist-page.component'
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path:'login', component:LoginFormComponent },
  {path:'user', canActivate:[AuthGuard],
    children: [
              {
                path: 'category',
                component: CategoryPageComponent,
                // canActivate:[AuthGuard]
              },
              {
                path:'category/:category',
                component: TodoslistPageComponent,
                // canActivate:[AuthGuard]
              }
    ]
  },
  // {path:'todoslist', component:TodoslistPageComponent, canActivate:[AuthGuard]},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
