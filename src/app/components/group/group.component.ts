import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Group, FocusedElement, Tooltip, Option, Link } from 'src/app/models';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  position?: number 
  isHover = false
  @Input() group!: Group;
  @Input() links!: Link[];
  @Input() isOpen!: Boolean;
  @Input() option: Option | undefined

  @Output() tooltip = new EventEmitter<Tooltip | undefined>()
  @Output() optionEvent = new EventEmitter<Option | undefined>()
  @Output() focusedElement = new EventEmitter<FocusedElement | undefined>()
  @Output() configRefOutput = new EventEmitter<ElementRef<HTMLDivElement>>()

  @ViewChild('config', {static: true}) configRef!: ElementRef<HTMLDivElement> 
  @ViewChild('options', {static: true}) optionsRef!: ElementRef<HTMLDListElement>
  @ViewChild('icon', {static: true}) iconRef!: ElementRef<HTMLDivElement>

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    this.position = this.appComponent.groups.findIndex(g=> g.id == this.group.id) + 1
  }

  toggleOptions(type: Option['type']) {
    if(!this.configRef.nativeElement.classList.contains('persist')){
      if(typeof document != 'undefined'){
        document.querySelectorAll('.header_group-config').forEach(e=> {
          e.classList.remove('persist')
        })
        document.querySelectorAll('.link_card-config').forEach(e=> {
          e.classList.remove('persist')
        })
      }
      this.configRef.nativeElement.classList.add('persist')
    }else{
      this.configRef.nativeElement.classList.remove('persist')
    }

    this.configRefOutput.emit(this.configRef)
    if(this.option && !this.configRef.nativeElement.classList.contains('persist')){
      this.optionEvent.emit(undefined)
    
    }else{
      const rect = this.configRef.nativeElement.getBoundingClientRect()
      this.optionEvent.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+16,
        type
      })
      this.focusedElement.emit({...this.group, position: this.position ? this.position : undefined, type: 'group'})
    }
  }

  createTooltip() {
    const { description } = this.group

    if(!this.isOpen){
      const rect = this.iconRef.nativeElement.getBoundingClientRect()
      const linksByGroup = this.links.filter(l=> l.groupId == this.group.id)
      this.tooltip.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+26,
        type: 'normal',
        content: `${this.group.name}${linksByGroup.length ? (' '+linksByGroup.length) : ''}`, 
        direction: 'left'
      })
    }

    if(description){
      this.isHover = true

      setTimeout(()=> {
        if(this.isHover){
          const rect = this.iconRef.nativeElement.getBoundingClientRect()
          this.tooltip.emit({
            top: rect.top+Math.floor(rect.height/2),
            left: rect.left+rect.width+26,
            type: 'description',
            content: description, 
            direction: 'left'
          })
        }
      }, 3000)
    }
  }

  deleteTooltip() {
    if(this.isHover)this.isHover = false
    this.tooltip.emit(undefined)
  }
}
