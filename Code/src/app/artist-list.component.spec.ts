import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListComponent } from './artist-list.component';
import { ArtistImagePipe } from './pipes/artist-image.pipe';
import { Observable, BehaviorSubject } from 'rxjs';
import { IArtist } from './services/music.service';

describe('ArtistListComponent', () => {
    let component: ArtistListComponent;
    let fixture: ComponentFixture<ArtistListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ArtistListComponent,
                ArtistImagePipe
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtistListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe(`setting the artists$ property`, () => {

        it('shows loading message while waiting for response', () => {
            component.artists$ = new Observable<IArtist[]>();

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                let em = (<HTMLElement>fixture.nativeElement).querySelector("em");
                expect(em).not.toBeNull();
                expect(em.innerText).toBe("loading...");
            })
        })

        it('shows no result message if no items in response', () => {
            component.artists$ = new BehaviorSubject<IArtist[]>([]).asObservable();

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                let message = (<HTMLElement>fixture.nativeElement).querySelector("span");

                expect(message).not.toBeNull();
                expect(message.innerText).toBe("No results! Please try another query...");
            })
        })

        it('shows one item per artist from response', () => {
            component.artists$ = new BehaviorSubject<IArtist[]>([
                { id: 1, name: "test1", images: null },
                { id: 2, name: "test2", images: null }
            ]).asObservable();

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                let items = (<HTMLElement>fixture.nativeElement).querySelectorAll("li");

                expect(items.length).toBe(2);
            })
        })

        it('shows an image if item has images', () => {
            component.artists$ = new BehaviorSubject<IArtist[]>([
                { id: 1, name: "test1", images: [{ url: "test", height: 100, width: 100 }] },
                { id: 2, name: "test2", images: null }
            ]).asObservable();

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                let images = (<HTMLElement>fixture.nativeElement).querySelectorAll("img");

                expect(images.length).toBe(1);
            })
        })

        it('shows the smallest image', () => {
            component.artists$ = new BehaviorSubject<IArtist[]>([
                {
                    id: 1, name: "test1", images: [
                        { url: "test", height: 200, width: 200 },
                        { url: "test2", height: 100, width: 100 }
                    ]
                }
            ]).asObservable();

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                let image = (<HTMLElement>fixture.nativeElement).querySelector("img");

                expect(new URL(image.src).pathname).toBe("/test2");
            })
        })

    });
});
