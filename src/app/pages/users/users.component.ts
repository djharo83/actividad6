import { Component, inject, signal } from '@angular/core';
import { IResponse, UsersService } from '../../services/users.service';
import { UserCardComponent } from '../../componets/user-card/user-card.component';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-users',
  imports: [UserCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {

  userService = inject(UsersService);

  arrayUsers = signal<IUser[]>([]);
  errorMessage: string | null = null;

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers() {
    
    this.errorMessage = null;

    this.userService.getAll().subscribe({
      next: (data: IResponse) => {
        this.arrayUsers.set(data.results);
      },
      error: (error) => {
        this.errorMessage = "No se pudieron cargar los usuarios";
      } 
    });
  }


  deleteUserById() { //output de user-card
    this.getAllUsers();
  }
  
  //TODO: implementar metodos para la paginacion
  goToNext() {
    //this.cargarPersonajes(this.linkNext)
  }

  goToPrev() {
    //this.cargarPersonajes(this.linkPrev)
  }

}
