export class Post {
    private _tittle: string;
    private _text: string;
    private _image: string;
  
    constructor(tittle: string, text: string, image: string) {
        this._tittle = tittle;
        this._text = text;
        this._image = image;
    }
  
    get tittle() {
        return this.tittle;
      }
    get text() {
      return this._text;
    }
    get image() {
        return this._image;
      }
  }

