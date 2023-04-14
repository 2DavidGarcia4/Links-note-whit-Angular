import { Component, OnChanges, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormCreateData } from 'src/app/models/form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  title = ''
  @Input() formData?: FormCreateData = undefined
  @Output() close = new EventEmitter<undefined>()
  @ViewChild('firstInput', {static: true}) firtsInputRef!: ElementRef<HTMLInputElement> 

  
  ngOnChanges(): void {
    if(this.formData){
      this.title = this.formData ? (this.formData.element ? `Editar ${this.formData.type == 'group' ? 'grupo' : 'link'}` : this.formData.type == 'group' ? 'Crear grupo' : 'Agregar link') : ''
      this.firtsInputRef.nativeElement.focus()
    }
  }

  closeForm() {
    this.close.emit(undefined)
  }
}
