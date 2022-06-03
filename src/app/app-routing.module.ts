import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  // {path:'employee', component:EmployeeComponent, children:[
  //     {path:'', component:EmplistingComponent},
  //     {path:"create", component:EmployeeAddComponent},
  //     {path:"Edit/:id", component:EmployeeAddComponent}
  //   ]
  //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
