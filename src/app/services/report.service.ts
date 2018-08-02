import { Injectable } from '@angular/core';
import { AngularFireStorage } from '../../../node_modules/angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from '../../../node_modules/angularfire2/firestore';
import { BehaviorSubject, Subscription, Observable } from '../../../node_modules/rxjs';
import Channel from '../entities/Channel';
import { AuthService } from '../core/auth.service';


export class Report{
  name : string;
  mail : string;
  date : Date;
  id : string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  private reports : Observable<Report[]>;
  private sub : Subscription;
  private reportSubject = new BehaviorSubject<Report>(null);
  private reportsCollection: AngularFirestoreCollection<Report>;
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
) {}
  private reportsSubject = new BehaviorSubject<Report[]>(null);


  loadReports() {
    console.log("loading reports ");
    this.reportsCollection = this.afs.collection<Report>('reports', ref => ref.orderBy('name', 'desc'));
    this.reports = this.reportsCollection.valueChanges();


    
    this.sub = this.reports.subscribe(
      reports => {
        //console.log(reports);

        this.sendReportList(reports)
        this.sub.unsubscribe();
      }
    );

  }
  sendReportList(message: Report[]) {
    this.reportsSubject.next( message );
}
getReportList(): Observable<Report[]> {
  return this.reportsSubject.asObservable();
  //return this.channels;
}

createReport( channel :Channel, mail){

  let report = new Report();
  report.date = new Date();
  report.mail = mail,
  report.name = channel.name;
    report.id = this.afs.createId();
  return this.afs.collection('reports').doc(report.id).set(Object.assign({}, report));
  
  }

  deleteReport( report :Report){

    return this.afs.collection('reports').doc(report.id).delete();
    
    }
}

