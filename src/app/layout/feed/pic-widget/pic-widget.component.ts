import {Component, Input, OnInit} from '@angular/core';
import {Picture} from '../../../models/pictures';

@Component({
  selector: 'app-pic-widget',
  templateUrl: './pic-widget.component.html',
  styleUrls: ['./pic-widget.component.scss'],
})
export class PicWidgetComponent implements OnInit {

  @Input() picture: Picture;

  constructor() { }

  ngOnInit() {}

}
