import { Component, inject, input, output } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {

  userService = inject(UsersService);
  router = inject(Router)

  miUser = input<IUser>();
  errorMessage: string | null = null;

  userDeleted = output<void>();//Solo lo he hecho para tener en cuenta que si el componente padre users.component no sabe que ha habido un cambio
                                // al estar en la misma pantalla home no veriamos el cambio de que se ha eliminado un usuario hasta refrescar o cambiar de página.

  deleteUserById(user: IUser | undefined) {

    if (!user || !user._id) return;

    const userId = user._id;
    this.errorMessage = null;
      
    Swal.fire({
      title: `Deseas Borrar al usuario ${user.first_name}`,
      iconHtml: '<i class="bi bi-trash text-gray"></i>',
      color: '#6c757d',
      showCancelButton: true,
      confirmButtonColor: '#FF8000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if(result.isConfirmed){
          this.userService.deleteById(userId).subscribe({
          next: () => {
            Swal.fire({
                    title: '¡Eliminado!',
                    text: `El usuario ${user.first_name} se ha eliminado correctamente`,
                    iconHtml: '<i class="bi bi-check-circle" style="color: #FF8000;"></i>',
                    customClass: {//quita el circulo por defecto
                        icon: 'border-0'
                    },
                    confirmButtonText: 'Volver al listado',
                    confirmButtonColor: '#FF8000',
            });
            this.userDeleted.emit();//emitir el evento al componente padre users.component
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
