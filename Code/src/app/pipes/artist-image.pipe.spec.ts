import { ArtistImagePipe } from "./artist-image.pipe";

describe(`ArtistImagePipe`, () => {
    let pipe: ArtistImagePipe;
    
    beforeEach(() => {
        pipe = new ArtistImagePipe();
    });

    it(`can be created`, () => {
        expect(pipe).toBeTruthy()
    });
    
    
    it(`returns null if passed null`, () => {
        let response = pipe.transform(null)
    
        expect(response).toBeNull()
    });

    it('returns null if artist has no images array', () => {
        let response = pipe.transform({ id: 1, name: "", images: null });
    
        expect (response).toBeNull();
    })
    
    it('returns null if artist has no images in the array', () => {
        let response = pipe.transform({ id: 1, name: "", images: [] });
    
        expect (response).toBeNull();
    })
    
    it('returns the smallest image', () => {
        let response = pipe.transform({ id: 1, name: "", images: [
            { url: "large.jpg", width: 1000, height: 1000 },
            { url: "medium.jpg", width: 500, height: 500 },
            { url: "small.jpg", width: 100, height: 100 }
        ]});
    
        expect (response).toBe("small.jpg");
    })
});