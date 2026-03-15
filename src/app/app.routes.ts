import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { NewUserFormComponent } from './pages/new-user-form/new-user-form.component';
import { UpdateUserFormComponent } from './pages/update-user-form/update-user-form.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [

  { path: "", pathMatch: 'full', redirectTo: "home" },
  { path: "home", component: UsersComponent },
  { path: "user/:id", component: UserViewComponent },
  { path: "newuser", component: NewUserFormComponent },
  { path: "updateuser/:id", component: UpdateUserFormComponent },
  { path: "**", component: Error404Component }

];
