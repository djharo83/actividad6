import { Component, inject, input, OnInit, signal } from '@angular/core';
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
  id = input<string>();
  errorMessage: string | null = null;
  user = signal<IUser | null>(null);

  userService = inject(UsersService);
  router = inject(Router);

  ngOnInit() {

    const userId = this.id();

    if (userId) {
      this.getUserById(userId);
    }
  }

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
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/).+$/)
      ])
    },[])
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    const control = this.userForm.get(controlName);
    return control?.hasError(errorName) && (control?.touched || control?.dirty || control?.value !== '');
  }

  getDataForm() {

    const userId = this.id();
    const user: IUser = this.userForm.value;

    userId ? this.updateUser(user, userId) : this.createUser(user);
  
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

  getUserById(id: string) {

    this.errorMessage = null;

    this.userService.getById(id).subscribe({
      next: (data: IUser) => {this.userForm.patchValue(data)},
      error: () => {
        this.errorMessage = 'No se ha encontrado al usuario';
      },
    });
  }
  
  updateUser(user: IUser | null, id:string | null) {

    if (!user || !id) return;

    this.userService.updateUser(user, id).subscribe({
      next: () => {
          toast.success('¡Usuario Actualizado!', {description: `El usuario ${user.first_name} se ha actualizado correctamente.`});
          this.router.navigate(['/home']);
      },
      error: () => {
          toast.error('Error al actualizar', {description: 'No se pudo actualizar al usuario.'
      });
      },
    });
  }
}
