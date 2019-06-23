import { Component, ChangeDetectorRef } from '@angular/core';
import { ProgressBarStatus } from 'src/app/enums/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public progressBarStatus = ProgressBarStatus;

  public estimate: string;
  public completed: string;
  public remainingTime: string;

  public progress: number;

  public timerExceded: boolean;
  public progressBarHovered: boolean;

  private remainingDate: Date;

  constructor() {
    this.progressBarStatus = ProgressBarStatus;
    this.progressBarHovered = false;
    this.estimate = '00:00';
    this.completed = '00:00';
    this.remainingTime = '00:00';
  }

  public updateRemainingTime() {
    if (!this.estimate || !this.completed) {
      return;
    }

    const estimateDate = this.timeStringToDate(this.estimate);
    const completedDate = this.timeStringToDate(this.completed);

    const diffDate = estimateDate.getTime() - completedDate.getTime();
    this.remainingDate = new Date(Math.abs(diffDate));
    this.remainingTime = this.dateToTimeString(this.remainingDate);

    if (completedDate < estimateDate) {
      this.timerExceded = false;
    } else {
      this.timerExceded = true;
    }
    this.initProgress();
  }

  private initProgress() {
    const estimateDate = this.timeStringToDate(this.estimate);
    const completedDate = this.timeStringToDate(this.completed);

    this.progress = completedDate.getTime() * 100 / estimateDate.getTime();


  }

  private timeStringToDate(timeString: string): Date {
    const date = new Date('1970-01-01T' + timeString + 'Z')
    return date;
  }

  private dateToTimeString(date: Date): string {
    let h = date.getUTCHours().toString();
    if (h.length === 1) {
      h = `0${h}`
    }
    let m = date.getMinutes().toString();
    if (m.length === 1) {
      m = `0${m}`
    }
    return `${h}:${m}`
  }

  public onProgressBarMouseEnter() {
    this.progressBarHovered = true;
  }

  public onProgressBarMouseLeave() {
    this.progressBarHovered = false;
  }

  public onAdjustEstimate() {
    alert("You just adjusted the estimate");
  }

}
