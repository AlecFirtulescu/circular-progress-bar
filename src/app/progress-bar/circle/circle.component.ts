import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
})
export class CircleComponent {

  private hovered: boolean;
  @Input() public color: string;
  @Input() public radius: number;
  @Input() public lineWidth: number;
  @Input() public startAngle: number = 0;
  @Input() public endAngle: number
  public get svgWidth(): number {
    return this.radius * 2 + this.lineWidth;
  }
  public get svgHeight(): number {
    return this.radius * 2 + this.lineWidth;
  }
  @Output() mouseEnter: EventEmitter<any> = new EventEmitter();
  @Output() mouseLeave: EventEmitter<any> = new EventEmitter();

  public get xPositionOfCircleMask(): number {
    return this.radius + (this.lineWidth / 2)
  }

  public get yPositionOfCircleMask(): number {
    return this.radius + (this.lineWidth / 2)
  }

  public get arcDescription(): string {
    let x = this.radius + this.lineWidth / 2;
    let y = this.radius + this.lineWidth / 2;

    if (!this.endAngle) {
      return " ";
    }

    let start = this.polarToCartesian(x, y, this.radius, this.endAngle);
    let end = this.polarToCartesian(x, y, this.radius, this.startAngle);

    const arcSweep = this.endAngle - this.startAngle <= 180 ? '0' : '1';

    const d = [
      'M', start.x, start.y,
      'A', this.radius, this.radius, this.startAngle, arcSweep, this.startAngle, end.x, end.y,
      'L', x, y,
      'L', start.x, start.y
    ].join(" ");

    return d;
  }

  public onMouseOver() {
    if (this.hovered) {
      this.onMouseLeave();
    }
  }

  public onMouseEnter() {
    this.hovered = true;
    this.mouseEnter.emit();
  }

  public onMouseLeave() {
    this.hovered = false;
    this.mouseLeave.emit();
  }

  private polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
}
