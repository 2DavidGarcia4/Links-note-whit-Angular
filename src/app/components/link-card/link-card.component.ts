import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FocusedElement, Group, Link, Option } from 'src/app/models';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss']
})
export class LinkCardComponent implements OnInit {
  @Input() link!: Link
  @Input() groups?: Group[]
  @Input() option?: Option
  
  group?: Group

  @Output() optionEvent = new EventEmitter<Option | undefined>()
  @Output() focusedElement = new EventEmitter<FocusedElement | undefined>()
  @Output() configRefOutput = new EventEmitter<ElementRef<HTMLDivElement>>()

  @ViewChild('config', {static: true}) configRef!: ElementRef<HTMLDivElement> 


  ngOnInit() {
    if(this.link.groupId){
      const group = this.groups?.find(g=> g.id == this.link.groupId)
      this.group = group
    }
  }

  toggleOptions(type: Option['type']) {
    this.configRef.nativeElement.classList.toggle('persist')
    this.configRefOutput.emit(this.configRef)

    if(this.option){
      this.optionEvent.emit(undefined)
    
    }else{
      const rect = this.configRef.nativeElement.getBoundingClientRect()
      this.optionEvent.emit({
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+10,
        type
      })
      this.focusedElement.emit({...this.link, type: 'link'})
    }
  }
}
