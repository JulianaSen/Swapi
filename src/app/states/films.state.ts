import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IFilm } from '../../interfaces/films';
import { AddFilm, DeleteFilm, GetFilms, UpdateFilm } from '../actions/films.actions';
import { FilmService } from '../../services/film.service';
import { tap } from 'rxjs/operators';

export class FilmStateModel {
    films: IFilm[];
}

@State<FilmStateModel>({
    name: 'films',
    defaults: {
        films: []
    }
})
export class FilmState {
    constructor(private filmService: FilmService) {
    }

    @Selector()
    static getFilmList({films}: FilmStateModel) {
        return films;
    }

    @Action(GetFilms)
    getFilms({patchState}: StateContext<FilmStateModel>) {
        return this.filmService.getFilms().pipe(tap((result) => {
            patchState({
                films: result,
            });
        }));
    }

    @Action(AddFilm)
    addFilm({getState, patchState}: StateContext<FilmStateModel>, {payload}: AddFilm) {
        return this.filmService.addFilm(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                films: [...state.films, result]
            });
        }));
    }

    @Action(UpdateFilm)
    updateFilm({getState, setState}: StateContext<FilmStateModel>, {payload}: UpdateFilm) {
        return this.filmService.updateFilm(payload).pipe(tap((result) => {
            const state = getState();
            const filmList = [...state.films];
            const filmIndex = filmList.findIndex(item => item.id === payload.id);
            filmList[filmIndex] = result;
            setState({
                ...state,
                films: filmList,
            });
        }));
    }


    @Action(DeleteFilm)
    deleteFilm({getState, setState}: StateContext<FilmStateModel>, {id}: DeleteFilm) {
        return this.filmService.deleteFilm(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.films.filter(item => item.id !== id);
            setState({
                ...state,
                films: filteredArray,
            });
        }));
    }
}