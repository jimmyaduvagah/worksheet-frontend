import {Component, OnInit, Input, Output, OnChanges, SimpleChanges} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {ResponseState} from '../../bases/models/ListResponse';


export interface Page {
    page: number;
    offset: number;
}

@Component({
    selector: 'as-pagination',
    templateUrl: 'app/directives/Pagination/templates/pagination.html'
})

export class PaginationComponent implements OnChanges {

    @Input()
    public state: ResponseState;

    @Input()
    public currentOffset: number = 0;

    @Output()
    public pageChange: EventEmitter<any> = new EventEmitter();

    public pagesArray: Page[];

    ngOnChanges(changes: SimpleChanges): any {
        this.countPages();
    }

    countPages() {
        let pagesArray: Page[] = [];
        let numPages = this.state.total / this.state.limit;
        for ( let i = 0; i < numPages; i++) {
            pagesArray.push({
                offset: i * this.state.limit,
                page: i + 1
            });
        }
        if (pagesArray.length > 0) {
            this.pagesArray = pagesArray;
        } else {
            this.pagesArray = undefined;
        }
    }

    goToPage(offset: number) {
        offset = Math.min(offset, ( (this.pagesArray.length - 1) * 10) ); // this should ensure i never go beyond the last page

        this.pageChange.emit(offset); // emits offset and when the (pageChange)=function($event) is called $event is the offset
    }
}
