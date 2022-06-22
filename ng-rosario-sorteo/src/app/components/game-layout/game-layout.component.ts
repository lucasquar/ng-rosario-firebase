import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { IParticipant } from 'src/app/models/participant.interface';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.css']
})
export class GameLayoutComponent implements OnInit {

  public dataSource: IParticipant[] = [];
  public comments: { userId: string, comment: string }[] = [];
  public talkValue: number = 80;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    const participantsCollection = collection(this.firestore, 'participants');
    collectionData(participantsCollection).subscribe(data => {
      this.dataSource = data as IParticipant[];
      this.comments = this.dataSource.filter(participant => participant.comment.length > 5)
        .map(participant => ({ userId: participant.userId, comment: participant.comment.length > 75 ? participant.comment.slice(0, 75) + '...' : participant.comment }));
      this.talkValue = this.dataSource.map(participant => participant.valuation).reduce((partialSum, a) => partialSum + a, 0) / this.dataSource.length;
    });

    setInterval(() => {
      this.talkValue = this.getRandomNumber(0, 100);
     }, 3000);
  }

  public chooseWinner() {
    const dataSourceSize = this.dataSource.length;

    const firstPlace = this.getRandomNumber(0, dataSourceSize);
    const secondPlace = this.getRandomNumber(0, dataSourceSize, [firstPlace]);
    const thirdPlace = this.getRandomNumber(0, dataSourceSize, [firstPlace, secondPlace]);

    console.log(`The winners are: 1- ${this.dataSource[firstPlace]?.nickname}, 2- ${this.dataSource[secondPlace]?.nickname}, 3- ${this.dataSource[thirdPlace]?.nickname}`);
  }

  public getRandomNumber(min: number, max: number, exclude: number[] = []) {
    let number = Math.floor(Math.random() * (max - min)) + min;
    while(exclude.find(x => x === number)) {
      number = Math.floor(Math.random() * (max - min)) + min;
    }

    return number;
  }

}
