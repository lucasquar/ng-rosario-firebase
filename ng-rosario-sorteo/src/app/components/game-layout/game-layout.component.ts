import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { IParticipant } from 'src/app/models/participant.interface';
import { WinnersDialogComponent } from '../winners-dialog/winners-dialog.component';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit {

  public dataSource: IParticipant[] = [];
  public comments: { userId: string, comment: string }[] = [];

  constructor(
    private firestore: Firestore,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const participantsCollection = collection(this.firestore, 'participants');
    collectionData(participantsCollection).subscribe(data => {
      this.dataSource = data as IParticipant[];
      this.comments = this.dataSource.filter(participant => participant.comment.length > 5)
        .map(participant => ({ userId: participant.userId, comment: participant.comment.length > 75 ? participant.comment.slice(0, 75) + '...' : participant.comment }));
    });
  }

  public get talkValue() {
    return this.dataSource.map(participant => participant.valuation).reduce((partialSum, a) => partialSum + a, 0) / this.dataSource.length;
  }

  public chooseWinner() {
    const participants = [...this.dataSource];

    this.dialog.open(WinnersDialogComponent, {
      data: { participants },
      disableClose: true,
      minWidth: '75%',
    });
  }

  public formatLabel(value: number): string | number {
    if (value === 100) {
      return `⭐`;
    } else if (value <= 60) {
      return `😔`;
    }

    return Math.round(value);
  }

}
