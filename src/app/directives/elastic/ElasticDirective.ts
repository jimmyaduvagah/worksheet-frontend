import {
    ElementRef, HostListener, Directive, AfterContentInit, AfterContentChecked,
    AfterViewChecked, OnInit
} from '@angular/core';

@Directive({
    /* tslint:disable */
    selector: '[as-elastic]'
    /* tslint:enable */
})

export class ElasticDirective implements OnInit {
    public i = 0;
    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }
    constructor(public element: ElementRef) {
    }
    ngOnInit() {
        setTimeout(() => {
            this.adjust();
        }, 1);
    }
    adjust() {
        this.i++;
        this.element.nativeElement.style.overflow = 'hidden';
        this.element.nativeElement.style.height = 'auto';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
    }
}
