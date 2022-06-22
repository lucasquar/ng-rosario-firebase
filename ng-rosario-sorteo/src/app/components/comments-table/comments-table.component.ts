import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  styleUrls: ['./comments-table.component.css']
})
export class CommentsTableComponent implements OnInit {

  @Input() comments!: { userId: string, comment: string }[];

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.comments?.push({
        userId: `${Math.random()}`,
        comment: `Comment nro ${Math.random()}`
      });
    }, 3000);
  }

  public trackByUserId(index: number, comment: any): string {
    return comment.userId;
  }
}
