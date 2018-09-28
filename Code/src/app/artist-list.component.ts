import { Component, Input } from '@angular/core';

@Component({
  selector: 'artist-list',
  templateUrl: './artist-list.component.html'
})
export class ArtistListComponent {
  @Input('artists') artists$;
}
