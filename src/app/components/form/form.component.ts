import { Component, OnChanges, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Group, FormElementData, Link } from 'src/app/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  title = ''
  @Input() formData?: FormElementData
  @Input() groups!: Group[]
  @Input() links!: Link[]
  @Output() close = new EventEmitter<undefined>()
  @ViewChild('form', {static: true}) formRef!: ElementRef<HTMLFormElement> 
  @ViewChild('firstInput', {static: true}) firtsInputRef!: ElementRef<HTMLInputElement> 
  @ViewChild('textArea', {static: true}) textAreaRef!: ElementRef<HTMLTextAreaElement>
  

  ngOnInit() {
    this.formRef.nativeElement.addEventListener('submit', (event: SubmitEvent)=> {
      event.preventDefault()
      
      const name = this.formRef.nativeElement['nameIt'].value
      const description = this.formRef.nativeElement['description'].value
      
      // console.log({name, description, color, emoji})

      if(this.formData?.type == 'group'){
        const emoji = this.formRef.nativeElement['emoji'].value
        const color = this.formRef.nativeElement['color'].value

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

        this.formRef.nativeElement['emoji'].value = ''

      }else{
        const url = this.formRef.nativeElement['url'].value
        const group = this.formRef.nativeElement['group'].value

        if(this.formData?.element){
          const link = this.links.find(l=> l.id == this.formData?.element?.id)
          if(link){
            link.name = name
            link.description = description
            
            if(group) link.groupId = parseInt(group) 
          }
          localStorage.setItem('links', JSON.stringify(this.links))

        }else{
          let id = 0, v = 1
          for(let i=0; i<v; i++){
            const generation = Math.floor(Math.random()*888888)+111111
            if(this.groups?.some(s=> s.id==generation)){
              v++
            }else id = generation
          }

          this.links.push({
            id, 
            url,
            name, 
            groupId: group ? parseInt(group) : undefined,
            description, 
          })

          localStorage.setItem('links', JSON.stringify(this.links))
        }
      }


      this.formRef.nativeElement['nameIt'].value = ''
      this.formRef.nativeElement['description'].value = ''
      
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
