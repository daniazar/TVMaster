import { Component, OnInit } from '@angular/core';
import { ReportService, Report } from '../../services/report.service';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-resports-page',
  templateUrl: './resports-page.component.html',
  styleUrls: ['./resports-page.component.scss']
})
export class ResportsPageComponent implements OnInit {

  constructor(public reportService : ReportService) { }
  
  ngOnInit() {
    this.reportService.loadReports();
  }


}
