import { Component, OnInit } from '@angular/core';
import Country from '../../entities/Country';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countryList : Country[];
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore) { }

  ngOnInit() {

  }

}
