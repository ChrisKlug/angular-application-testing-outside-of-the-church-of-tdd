import { MusicService, IArtist } from './music.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MusicService', () => {

    let http: HttpTestingController;
    let svc: MusicService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MusicService
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
    });

    beforeEach(() => {
        http = TestBed.get(HttpTestingController);
        svc = TestBed.get(MusicService);
    })

    afterEach(() => {
        http.verify();
    })


    it('should be created', () => {
        let svc = TestBed.get(MusicService);

        expect(svc).toBeTruthy();
    });

    describe(`searchArtist`, () => {

        it('should call webserver', () => {
            svc.searchArtist("test").subscribe();

            http.expectOne("http://localhost:3000/artists?q=test");
        });

        it('returns the values from the server', () => {
            const fakeResult = [ { id: 1, name: "TEST", images: [] } ];
            let artists: IArtist[];
        
            svc.searchArtist("test").subscribe(x => artists = x);
        
            http.expectOne("http://localhost:3000/artists?q=test").flush(fakeResult);
        
            expect(artists).toBe(fakeResult);
        });

    });
});
