import { Component, inject, signal } from '@angular/core';
import { IResponse, UsersService } from '../../services/users.service';
import { UserCardComponent } from '../../componets/user-card/user-card.component';
import { IUser } from '../../interfaces/iuser.interface';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users',
  imports: [UserCardComponent, NgxPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {

  userService = inject(UsersService);

  arrayUsers = signal<IUser[]>([]);
  errorMessage: string | null = null;

  //paginación
  p: number = 1;
  total: number = 0;

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers() {
    
    this.errorMessage = null;

    this.userService.getAll(this.p).subscribe({
      next: (data: IResponse) => {
        this.arrayUsers.set(data.results);
        this.total = data.total;
      },
      error: () => {
        this.errorMessage = "No se pudieron cargar los usuarios";
      } 
    });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getAllUsers();
  }

  deleteUserById() { //output de user-card
    this.getAllUsers();
  }

}
