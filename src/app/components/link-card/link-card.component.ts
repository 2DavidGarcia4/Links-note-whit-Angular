import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
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
  
  @Output() optionEvent = new EventEmitter<Option | undefined>()
  @Output() focusedElement = new EventEmitter<FocusedElement | undefined>()
  @Output() configRefOutput = new EventEmitter<ElementRef<HTMLDivElement>>()

  @ViewChild('config', {static: true}) configRef!: ElementRef<HTMLDivElement> 

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    this.option = this.appComponent.option
  }

  toggleOptions(type: Option['type']) {
    this.option = this.appComponent.option
    this.configRef.nativeElement.classList.toggle('persist')
    this.configRefOutput.emit(this.configRef)

    if(this.option){
      this.appComponent.option = undefined
    
    }else{
      const rect = this.configRef.nativeElement.getBoundingClientRect()
      this.appComponent.option = {
        top: rect.top+Math.floor(rect.height/2),
        left: rect.left+rect.width+10,
        type
      }
      this.focusedElement.emit({...this.link, type: 'link'})
    }
  }
}
