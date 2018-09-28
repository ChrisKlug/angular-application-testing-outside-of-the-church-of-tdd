import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MusicService } from './services/music.service';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                MusicService,
                { provide: HttpClient, useValue: {} }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('does a search on search', () => {
        let search: string;

        spyOn(TestBed.get(MusicService), "searchArtist").and.callFake(x => search = x);

        component.search("TEST");

        expect(search).toBe("TEST");
    })

    it('adds a debounce directive to the input field', () => {
        let input = fixture.debugElement.query(x => x.name == "input");
        let debounceListener = input.listeners.find(x => x.name == "debounce");
    
        expect(debounceListener).toBeDefined();
    })

    it('does a search on debounce', () => {
        let search: string;
    
        spyOn(TestBed.get(MusicService), "searchArtist").and.callFake(x => search = x);
    
        let input = fixture.debugElement.query(x => x.name == "input");
        let debounceListener = input.listeners.find(x => x.name == "debounce");
        debounceListener.callback("TEST")
    
        expect(search).toBe("TEST");
    })
});
