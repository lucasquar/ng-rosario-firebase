import { Component, OnInit } from '@angular/core';
import { CollectionReference, collectionSnapshots, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { addDoc, collection } from '@firebase/firestore';
import { map, Observable } from 'rxjs';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  public inputConReglas = '';
  public inputSinReglas = '';

  public conReglasCollection$!: Observable<any[]>;
  public sinReglasCollection$!: Observable<any[]>;

  private conReglasCollectionRef: any;
  private sinReglasCollectionRef: any;

  constructor(
    private firestore: Firestore,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.conReglasCollectionRef = collection(this.firestore, 'conReglas');
    this.sinReglasCollectionRef = collection(this.firestore, 'sinReglas');

    this.conReglasCollection$ = this.getCollectionData(this.conReglasCollectionRef);
    this.sinReglasCollection$ = this.getCollectionData(this.sinReglasCollectionRef);
  }

  public crearConReglas = () => { 
    this.createDoc(this.conReglasCollectionRef, this.inputConReglas);
    this.inputConReglas = '';
  }

  public eliminarConReglas = (docId: string) => this.deleteDoc(this.conReglasCollectionRef, docId);

  public crearSinReglas = () => {
    this.createDoc(this.sinReglasCollectionRef, this.inputSinReglas);
    this.inputSinReglas = '';
  }

  public eliminarsinReglas = (docId: string) => this.deleteDoc(this.sinReglasCollectionRef, docId);

  public trackById = (index: number, doc: any) => doc.id;
  
  private createDoc = (collectionRef: CollectionReference, text: string) => this.runPromise(addDoc(collectionRef, { texto: text }));

  private deleteDoc(collectionRef: CollectionReference, docId: string) {
    const ref = doc(collectionRef, docId);
    this.runPromise(deleteDoc(ref));
  }

  private runPromise(promise: Promise<any>) {
    promise.catch((error) => {
      this.showError(error);
    });
  }

  private getCollectionData(collectionRef: CollectionReference) {
    return collectionSnapshots(collectionRef)
      .pipe(
        map(actions => actions.map(a => {
          const data = a.data();
          const id = a.id;
          return { id, ...data };
        }))
      );
  }

  private showError(error: any) {
    const textError = `😔 Error al crear documento: ${error}`;
    this.dialog.open(ErrorComponent, {
      data: { textError },
      minWidth: '75%',
    });
  }
}
