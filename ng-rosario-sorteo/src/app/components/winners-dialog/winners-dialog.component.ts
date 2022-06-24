import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IParticipant } from 'src/app/models/participant.interface';

@Component({
  selector: 'app-winners-dialog',
  templateUrl: './winners-dialog.component.html',
  styleUrls: ['./winners-dialog.component.css']
})
export class WinnersDialogComponent implements OnInit {

  public firstPlace!: IParticipant;
  public secondPlace!: IParticipant;
  public thirdPlace!: IParticipant;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WinnersDialogComponent>,
  ) { }

  ngOnInit(): void {
    const winners = this.getMultipleRandom(this.data.participants, 3);
    this.firstPlace = winners[0];
    this.secondPlace = winners[1];
    this.thirdPlace = winners[2];
  }

  private getMultipleRandom(arr: any[], num: number): any[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }

}
