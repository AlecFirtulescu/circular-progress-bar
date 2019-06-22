import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  private _status: ProgressBarStatus;
  @Input() public get status(): ProgressBarStatus {
    return this._status;
  }
  public set status(newValue: ProgressBarStatus) {
    this._status = newValue
  }

  @Input() public progress: number;
  @Input() public lineWidth: number;

  public get progressInDegrees() {
    return this.progress * 359.99 / 100;
  }
}
