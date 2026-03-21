import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
      next: (data: IUser) => {this.user.set(data)},
      error: () => {
        this.errorMessage = 'No se ha encontrado al usuario';
      },
    });
  }

  deleteUserById(user: IUser | null) {
    
    if (!user || !user._id) return;
    
    const userId = user._id;
    this.errorMessage = null;
      
    Swal.fire({
      title: `Deseas Borrar al usuario ${user.first_name}`,
      iconHtml: '<i class="bi bi-trash text-gray"></i>',
      color: '#6c757d',
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#FF8000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if(result.isConfirmed){
          this.userService.deleteById(userId).subscribe({
          next: () => {
              Swal.fire({
                    title: '¡Eliminado!',
                    text: `El usuario ${user.first_name} se ha borrado correctamente`,
                    icon: 'success',
                    confirmButtonText: 'Volver al listado',
                    confirmButtonColor: '#6c757d',
              }).then(()=> {
                this.router.navigate(['/home']);
              })
          },
          error: () => {
            this.errorMessage = 'No se pudo eliminar al usuario';
            Swal.fire({
              title: 'Error',
              text: this.errorMessage,
              icon: 'error',
              confirmButtonText: 'Cerrar',
              confirmButtonColor: '#6c757d'
            });
          },
        });
      }
    });
  }
}
