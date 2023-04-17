import { Component} from '@angular/core';
import { Group, Tooltip, Option, FocusedElement, FormElementData } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  groups: Group[] = []
  focusedElement: FocusedElement | undefined
  formData?: FormElementData
  tooltip: Tooltip | undefined 
  option: Option | undefined
  
  
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

  setFormType(type: FormElementData['type']) {
    this.formData = {type}
    this.option = undefined
  }

  setFocusedElement(element?: FocusedElement) { 
    this.focusedElement = element
  }

  closeForm(){
    this.formData = undefined
  }

  openEditForm() {
    this.option = undefined
    if(this.focusedElement){
      this.formData = {type: this.focusedElement.type, element: this.focusedElement}
    }
  }

  deleteGroup(groupId: number) {
    this.groups.splice(this.groups.findIndex(f=> f.id == groupId), 1)
    localStorage.setItem('groups', JSON.stringify(this.groups))
  }

  createTooltip(tooltipData: Tooltip | undefined) {
    this.tooltip = tooltipData
  }

  updateOption(op: Option | undefined) {
    this.option = op
  }
}
