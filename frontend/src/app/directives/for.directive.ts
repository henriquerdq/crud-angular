import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  @Input('myForEm') numbers: number[] = []

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {

   }

   ngOnInit() {
     this.numbers.forEach(num => {
       this.container.createEmbeddedView(this.template, { $implicit : num});
     });
   }

}
