import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArtistImagePipe } from './pipes/artist-image.pipe';
import { MusicService } from './services/music.service';
import { DebounceDirective } from './directives/debounce.directive';
import { ArtistListComponent } from './artist-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistImagePipe,
    DebounceDirective,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    MusicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
