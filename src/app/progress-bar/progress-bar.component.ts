import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProgressBarStatus } from '../enums/enums';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  public backgroundBarColor: string;
  public progressBarColor: string;
  private _status: ProgressBarStatus;
  @Input() public get status(): ProgressBarStatus {
    return this._status;
  }
  public set status(newValue: ProgressBarStatus) {
    this._status = newValue
    if (newValue === ProgressBarStatus.Exceeded) {
      this.backgroundBarColor = '#2E87DB';
      this.progressBarColor = '#C51F5F';
    } else if (newValue === ProgressBarStatus.Normal) {
      this.backgroundBarColor = '#E1E1E1';
      this.progressBarColor = '#2E87DB';
    }
  }

  @Input() public progress: number;
  @Input() public lineWidth: number;
  @Output() mouseEnter: EventEmitter<any> = new EventEmitter();
  @Output() mouseLeave: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.backgroundBarColor = '#E1E1E1';
    this.progressBarColor = '#2E87DB';
  }

  public get progressInDegrees() {
    if (this.progress >= 100) {
      this.status = ProgressBarStatus.Exceeded;
      this.progress = this.progress % 100;
    }
    return this.progress * 359.99 / 100;
  }

  public onBackgroundCircleMouseEnter() {
    if (this.status === ProgressBarStatus.Normal) {
      this.backgroundBarColor = '#D3E3F2'
    }
    this.mouseEnter.emit();
  }

  public onBackgroundCircleMouseLeave() {
    if (this.status === ProgressBarStatus.Normal) {
      this.backgroundBarColor = '#E1E1E1';
    } else {
      this.backgroundBarColor = '#2E87DB';
    }
    this.mouseLeave.emit();
  }
}
