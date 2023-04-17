import { Component} from '@angular/core';
import { FormElementData } from './models/form.model';
import { Group } from './models/group.model';
import { Tooltip } from './models/tooltipo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  groups: Group[] = []
  formData: FormElementData | undefined = undefined
  tooltip: Tooltip | undefined = undefined 
  
  
  //? Se llama después de que la vista del componente y sus hijos se hayan inicializado.
  ngAfterViewInit() {
  }

  ngOnInit() {
    if(typeof localStorage != 'undefined') {
      const localData = localStorage.getItem('groups')
      if(localData){
        this.groups = JSON.parse(localData)
      }
    }
  }

  setFormData(formElementData: FormElementData) { 
    this.formData = formElementData
  }

  resetFormData(data: undefined) {
    this.formData = data
  }

  deleteGroup(groupId: number) {
    this.groups.splice(this.groups.findIndex(f=> f.id == groupId), 1)
    localStorage.setItem('groups', JSON.stringify(this.groups))
  }

  createTooltip(tooltipData: Tooltip | undefined) {
    console.log(tooltipData)
    this.tooltip = tooltipData
  }
}
