import { ImageService } from './../services/image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocontrast',
  templateUrl: './autocontrast.component.html',
  styleUrls: ['./autocontrast.component.css']
})
export class AutocontrastComponent implements OnInit {
  private min: any = Math.min(this.imageService.pixels);


  private max: any = Math.max(this.imageService.pixels);

  constructor(private imageService: ImageService) { }

  private autoContrast = () => {
    for (let i = 0; i < this.imageService.numPixels; i++) {
      this.imageService.pixels[i * 4] = (this.imageService.pixels[i * 4] - this.min) / (this.max - this.min) * 255; //Red
      this.imageService.pixels[i * 4 + 1] = (this.imageService.pixels[i * 4 + 1] - this.min) / (this.max - this.min) * 255; //Green
      this.imageService.pixels[i * 4 + 2] = (this.imageService.pixels[i * 4 + 2] - this.min) / (this.max - this.min) * 255; //Blue
    }

    this.imageService.context.clearRect(0, 0, this.imageService.canvas.width, this.imageService.canvas.height);
    this.imageService.context.putImageData(this.imageService.imageData, 0, 0);

  };
  ngOnInit() {
    this.imageService.functions.autoContrast = this.autoContrast;
  }
}
