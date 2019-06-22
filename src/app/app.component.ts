import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public estimate: string;
  public completed: string;
  public remainingTime: string;

  public updateRemainingTime() {
    if (!this.estimate || !this.completed) {
      return;
    }

    const estimateTime = this.timeStringToDate(this.estimate);
    const completedTime = this.timeStringToDate(this.completed);

    if (estimateTime < completedTime) {
      const diffDate = completedTime.getTime() - estimateTime.getTime();
      this.remainingTime = this.dateToTimeString(new Date(diffDate));
    } else {

    }

  }

  private timeStringToDate(timeString: string): Date {
    return new Date('1970-01-01T' + timeString + 'Z')
  }

  private dateToTimeString(date: Date) {
    let h = date.getHours().toString();
    if (h.length === 1) {
      h = `0${h}`
    }
    let m = date.getMinutes().toString();
    if (m.length === 1) {
      m = `0${m}`
    }
    return `${h}:${m}`
  }

}
