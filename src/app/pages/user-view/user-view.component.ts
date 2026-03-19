import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {

  userService = inject(UsersService);
  router = inject(Router);

  id = input<string>();
  errorMessage: string | null = null;
  user = signal<IUser | null>(null);

  ngOnInit() {
    const userId = this.id();

    if (userId) {
      this.getUserById(userId);
    } else {
      this.errorMessage = 'El id del usuario no ha sido proporcionado.';
    }
  }

  getUserById(id: string) {

    this.errorMessage = null;

    this.userService.getById(id).subscribe({
      next: (data: IUser) => {this.user.set(data);},
      error: (error) => {
        this.errorMessage = 'No se ha encontrado al usuario';
      },
    });
  }

  deleteUserById(user: IUser | null) {
    
    if (!user || !user._id) return;

    if(confirm(`Deseas eliminar al usuario ${user.first_name}`)){
      
      this.errorMessage = null;
      
      this.userService.deleteById(user._id).subscribe({
        next: () => {
          alert(`El usuario, ${user.first_name} se ha eliminado correctamente`);
          this.router.navigate(['/home']);
        },
        error: () => {
          this.errorMessage = 'No se pudo eliminar al usuario';
        },
      });
    }
  }
}
