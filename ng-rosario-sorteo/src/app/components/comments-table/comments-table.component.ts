import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  styleUrls: ['./comments-table.component.css']
})
export class CommentsTableComponent implements OnInit {

  @Input() comments!: { userId: string, comment: string }[];

  constructor() { }

  ngOnInit(): void { }

  public trackByUserId(index: number, comment: any): string {
    return comment.userId;
  }
}
