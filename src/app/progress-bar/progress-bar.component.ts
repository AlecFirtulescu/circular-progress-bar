import { Component, Input, EventEmitter, Output } from '@angular/core';

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
  }

  @Input() public progress: number;
  @Input() public lineWidth: number;

  constructor() {
    this.backgroundBarColor = '#F5F5F5';
    this.progressBarColor = '#2E87DB';
  }

  public get progressInDegrees() {
    return this.progress * 359.99 / 100;
  }

  public onBackgroundCircleMouseEnter() {
    this.progressBarColor = 'red';
  }

  public onBackgroundCircleMouseLeave() {
  }
}
