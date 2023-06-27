import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './services/auth.guard';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Task', component: TaskComponent, canActivate:[AuthGuard]},
  {path: 'Details/:id', component: DetailsComponent,
  children: [
    {path: 'search', component: SearchComponent}
  ]},

  {path: '', redirectTo: '/Login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
