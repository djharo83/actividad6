import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [

  { path: "", pathMatch: 'full', redirectTo: "home" },
  { path: "home", component: UsersComponent },
  { path: "user/:id", component: UserViewComponent },
  { path: "newuser", component: UserFormComponent },
  { path: "updateuser/:id", component: UserFormComponent },
  { path: "**", component: Error404Component }

];
