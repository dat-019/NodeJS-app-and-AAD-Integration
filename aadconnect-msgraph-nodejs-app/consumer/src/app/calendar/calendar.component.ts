import { Component, OnInit } from '@angular/core';
import { DateTimeTimeZone } from './event';
import { AlertsService } from '../alerts.service';
import * as moment from 'moment-timezone';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private events: Event[];

  constructor(private alertsService: AlertsService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCalendar().subscribe(e => this.events = e);
  }

  formatDateTimeTimeZone(dateTime: DateTimeTimeZone): string {
    try {
      return moment.tz(dateTime.dateTime, dateTime.timeZone).format();
    }
    catch(error) {
      this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }

}
