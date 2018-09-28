import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private musicService: MusicService) { }

  ngOnInit() {
  }

  search(query: string) {
    if (!query) {
      delete this.artists$;
      return;
    }
    this.artists$ = this.musicService.searchArtist(query);
  }

  artists$: Observable<any>;
}
