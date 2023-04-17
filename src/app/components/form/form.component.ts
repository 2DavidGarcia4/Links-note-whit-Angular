import { Component, OnChanges, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Group, FormElementData } from 'src/app/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  title = ''
  @Input() formData?: FormElementData
  @Input() groups!: Group[]
  @Output() close = new EventEmitter<undefined>()
  @Output() group = new EventEmitter<Group>()
  @ViewChild('form', {static: true}) formRef!: ElementRef<HTMLFormElement> 
  @ViewChild('firstInput', {static: true}) firtsInputRef!: ElementRef<HTMLInputElement> 
  @ViewChild('textArea', {static: true}) textAreaRef!: ElementRef<HTMLTextAreaElement>
  

  ngOnInit() {
    this.formRef.nativeElement.addEventListener('submit', (event: SubmitEvent)=> {
      event.preventDefault()
      
      const name = this.formRef.nativeElement['nameIt'].value
      const description = this.formRef.nativeElement['description'].value
      const color = this.formRef.nativeElement['color'].value
      const emoji = this.formRef.nativeElement['emoji'].value
      
      // console.log({name, description, color, emoji})

      if(this.formData?.type == 'group'){
        if(this.formData.element){
          const group = this.groups.find(g=> g.id == this.formData?.element?.id)
          if(group){
            group.name = name
            group.description = description
            group.color = color
            group.emoji = emoji
          }
          localStorage.setItem('groups', JSON.stringify(this.groups))

        }else{
          let id = 0, v = 1
          for(let i=0; i<v; i++){
            const generation = Math.floor(Math.random()*8888)+1111
            if(this.groups?.some(s=> s.id==generation)){
              v++
            }else id = generation
          }

          this.groups.push({
            id, 
            name, 
            description, 
            color: color == '#000000' ? '#cccccc' : color, 
            emoji: /\p{Emoji}/gu.test(emoji) ? emoji : undefined
          })

          localStorage.setItem('groups', JSON.stringify(this.groups))
        }
      }else{

      }


      this.formRef.nativeElement['nameIt'].value = ''
      this.formRef.nativeElement['description'].value = ''
      this.formRef.nativeElement['emoji'].value = ''
      
      this.closeForm()
    })
  }
  
  ngOnChanges() {
    if(this.formData){
      this.title = (this.formData.element ? `Editar ${this.formData.type == 'group' ? 'grupo' : 'link'}` : this.formData.type == 'group' ? 'Crear grupo' : 'Agregar link')
      this.firtsInputRef.nativeElement.focus()
    }
  }

  closeForm() {
    this.close.emit(undefined)
  }

  hendleKeyUp(event: KeyboardEvent) {
    const textArea = event.currentTarget as HTMLTextAreaElement
    const textAreaStyle = textArea.style
    textAreaStyle.height = `38px`
    const scHeight = textArea.scrollHeight, newHeight = `${scHeight}px`
    if(textAreaStyle.height != newHeight){
      textAreaStyle.height = newHeight
    }
  }
}
