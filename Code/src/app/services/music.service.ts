import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MusicService {

  constructor(private http: HttpClient) { }

  searchArtist(query: string) : Observable<IArtist[]> {
    return this.http.get<IArtist[]>("http://localhost:3000/artists?q=" + query);
  }
}

export interface IArtist {
  id: number;
  name: string;
  images: IImage[];
}

export interface IImage {
  url: string;
  width: number;
  height: number;
}