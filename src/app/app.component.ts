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
  public timerExceded: boolean;
  public progress: number;

  private interval;
  private estimateDate: Date;
  private completedDate: Date;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.progressBarStatus = ProgressBarStatus;
  }

  public updateRemainingTime() {
    if (!this.estimate || !this.completed) {
      return;
    }

    this.estimateDate = this.timeStringToDate(this.estimate);
    this.completedDate = this.timeStringToDate(this.completed);

    const diffDate = this.estimateDate.getTime() - this.completedDate.getTime();
    this.remainingTime = this.dateToTimeString(new Date(Math.abs(diffDate)));

    if (this.completedDate > this.estimateDate) {
      this.timerExceded = false;
      this.initTimer();
    } else {
      this.timerExceded = true;
    }
    this.changeDetector.markForCheck();
  }

  private updateProgress(incrementTimeInterval: number) {
    const diffDate = this.completedDate.getTime() - this.estimateDate.getTime();
    const incrementRatio = (incrementTimeInterval * 100) / diffDate;
    this.progress += incrementRatio;
  }

  private initTimer() {
    this.stopTimer();
    this.progress = 0;
    const timerInterval = 1000;
    this.interval = setInterval(() => {
      let diffDate = this.timeStringToDate(this.remainingTime).getTime() - timerInterval;
      if (diffDate <= 0) {
        this.timerExceded = true;
      }
      this.updateProgress(timerInterval);
      this.remainingTime = this.dateToTimeString(new Date(diffDate));
    }, timerInterval)
  }

  private stopTimer() {
    clearInterval(this.interval);
  }

  private timeStringToDate(timeString: string): Date {
    const date = new Date('1970-01-01T' + timeString + '+0000')
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

  public onProgressBarEnter() {
    console.log('app');
  }

  public onProgressBarLeave() {
    console.log('app');
  }

}
