import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent {

  constructor(private elRef: ElementRef) { }

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

  public get xPositionOfCircleMask(): number {
    return this.radius + (this.lineWidth / 2)
  }

  public get yPositionOfCircleMask(): number {
    return this.radius + (this.lineWidth / 2)
  }

  public get arcDescription(): string {
    let x = this.radius + this.lineWidth / 2;
    let y = this.radius + this.lineWidth / 2;

    let start = this.polarToCartesian(x, y, this.radius, this.endAngle);
    let end = this.polarToCartesian(x, y, this.radius, this.startAngle);

    var arcSweep = this.endAngle - this.startAngle <= 180 ? '0' : '1';

    var d = [
        'M', start.x, start.y, 
        'A', this.radius, this.radius, this.startAngle, arcSweep, this.startAngle, end.x, end.y,
        'L', x,y,
        'L', start.x, start.y
    ].join(" ");
    
    return d;  
  }

  private polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
}
