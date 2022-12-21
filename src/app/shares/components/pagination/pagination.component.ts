import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  headerTemplate: TemplateRef<any>;

  @Input()
  paginationIdx: string;

  @Output() appOnPageChange = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onPageChange($event: any) {
    this.appOnPageChange.emit($event);
  }
}
