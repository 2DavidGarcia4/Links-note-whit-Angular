import { Component} from '@angular/core';
import { FormCreateData } from './models/form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formData: FormCreateData | undefined = {
    type: 'group'
  }
  //? Se llama después de que la vista del componente y sus hijos se hayan inicializado.
  ngAfterViewInit() {
  }

  setFormData(formCreateData: FormCreateData) { 
    this.formData = formCreateData
  }

  resetFormData(data: undefined) {
    this.formData = data
  }
}
