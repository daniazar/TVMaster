import { Component, OnInit } from '@angular/core';
import Country from '../../entities/Country';
import { Observable} from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries : Country[];
  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore) { }

    private countryCollection: AngularFirestoreCollection<Country>;
    countries: Observable<Country[]>;

  ngOnInit() {
    this.loadCountries();

  }
  loadCountries() {
    this.countryCollection = this.afs.collection<Country>('countries', ref => ref.orderBy('name', 'desc'));
    this.countries = this.countryCollection.valueChanges();
  }
}
