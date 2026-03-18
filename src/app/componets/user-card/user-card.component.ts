import { Component, inject, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {

  miUser = input<IUser>();

  userService = inject(UsersService);

  errorMessage: string | null = null;

  deleteUserById(userId: string|undefined) {
    console.log('*********Entro en eliminar usuario************', userId);
    if(userId){
      this.userService.deleteById(userId);
    }else{
      this.errorMessage = 'El id del usuario no ha sido proporcionado.'
    }
  }

}
