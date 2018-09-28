import { Pipe, PipeTransform } from '@angular/core';
import { IArtist } from '../services/music.service';

@Pipe({
  name: 'artistImage'
})
export class ArtistImagePipe implements PipeTransform {

  transform(value: IArtist, args?: any): any {
    if (!value || !value.images || !value.images.length)
      return null;

    return value.images.reduce((prev, current) => prev && prev.width < current.width ? prev : current).url;
  }
}