import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IParticipant } from 'src/app/models/participant.interface';

@Component({
  selector: 'app-participant-table',
  templateUrl: './participant-table.component.html',
  styleUrls: ['./participant-table.component.css'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])
    ])

]
})
export class ParticipantTableComponent implements OnInit {

  @Input() participants!: IParticipant[];

  public dataSource: IParticipant[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  trackById(index: number, item: IParticipant): string {
    return item.userId;
  }

}
