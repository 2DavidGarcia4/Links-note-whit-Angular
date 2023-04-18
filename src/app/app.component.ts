import { Component, ElementRef} from '@angular/core';
import { Group, Tooltip, Option, FocusedElement, FormElementData, Link } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  groups: Group[] = []
  links: Link[] = []
  focusedElement?: FocusedElement
  focusedOptionRef?: ElementRef<HTMLDivElement>
  formData?: FormElementData
  tooltip?: Tooltip 
  option?: Option
  
  
  //? Se llama después de que la vista del componente y sus hijos se hayan inicializado.
  ngAfterViewInit() {
  }

  ngOnInit() {
    if(typeof localStorage != 'undefined') {
      const localGroupsData = localStorage.getItem('groups')
      const localLinksData = localStorage.getItem('links')
      if(localGroupsData){
        this.groups = JSON.parse(localGroupsData)
      }

      if(localLinksData){
        this.links = JSON.parse(localLinksData)
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
    this.focusedOptionRef?.nativeElement.classList.remove('persist')
  }

  deleteElement() {
    if(typeof document != 'undefined') {
      document.querySelector('.group-config')?.classList.remove('persist')
    }
    this.option = undefined
    if(this.focusedElement){
      if(this.focusedElement.type == 'group'){
        this.groups.splice(this.groups.findIndex(f=> f.id == this.focusedElement?.id), 1)
        localStorage.setItem('groups', JSON.stringify(this.groups))
      
      }else{
        this.links.splice(this.links.findIndex(f=> f.id == this.focusedElement?.id), 1)
        localStorage.setItem('links', JSON.stringify(this.links))
      }
    }
    this.focusedOptionRef?.nativeElement.classList.remove('persist')
  }

  createTooltip(tooltipData: Tooltip | undefined) {
    this.tooltip = tooltipData
  }

  updateOption(op: Option | undefined) {
    this.option = op
  }

  setFocusedOptionRef(ref: ElementRef<HTMLDivElement>) {
    this.focusedOptionRef = ref
  }
}
