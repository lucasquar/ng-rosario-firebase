import { Component } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public comments$: Observable<IComment[]>;
  private commentsCollection: any;

  constructor(private firestore: Firestore) {
    this.commentsCollection = collection(this.firestore, 'comments');
    this.comments$ = collectionData(this.commentsCollection);
  }
}

interface IComment {
  description: string;
  date: Date;
}
