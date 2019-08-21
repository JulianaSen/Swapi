import { IFilm } from '../../interfaces/films';

export class AddFilm {
    static readonly type = '[IFilm] Add';
    constructor(public payload: IFilm) {
    }
}

export class GetFilms {
    static readonly type = '[IFilm] Get';
}

export class UpdateFilm {
    static readonly type = '[IFilm] Update';
    constructor(public payload: IFilm) {
    }
}

export class DeleteFilm {
    static readonly type = '[IFilm] Delete';
    constructor(public id: number) {
    }
}