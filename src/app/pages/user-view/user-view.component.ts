import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {

  userService = inject(UsersService);

  id = input<string>();
  errorMessage: string | null = null;
  user = signal<IUser | null>(null);
  
  ngOnInit(){
    
    const userId = this.id();
    console.log('Ruta id usuario: ', userId);
    
    if(userId){
      this.getUserById(userId);
    }else{
      this.errorMessage = 'El id del usuario no ha sido proporcionado.'
    }
  }
  
  getUserById(id: string) {
    
    this.errorMessage = null;

    this.userService.getById(id).subscribe({
      next: (data: IUser) => {
        this.user.set(data);
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = "No se ha encontrado al usuario";
      } 
    });
  }

}
