import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/iuser.interface';
import { Router} from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-new-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {

  userForm: FormGroup
  
  userService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+\@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,3}$/)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/)
      ])
    },[])
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }

  getDataForm() {
    this.createUser(this.userForm.value);
    this.userForm.reset()
  }

  createUser(user: IUser | null) {

    if (!user) return;

    this.userService.createUser(user).subscribe({
      next: () => {
          toast.success('¡Usuario Guardado!', {description: `El usuario ${user.first_name} se ha guardado correctamente.`});
          this.router.navigate(['/home']);
      },
      error: () => {
          toast.error('Error al guardar', {description: 'No se pudo guardar al usuario.'
      });
      },
    });
  }
}
