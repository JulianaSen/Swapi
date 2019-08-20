import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IFilm } from '../../interfaces/films';
import { AddFilm, DeleteFilm, GetFilms, SetSelectedFilm, UpdateFilm } from '../actions/films.actions';
import { FilmService } from '../../services/film.service';
import { tap } from 'rxjs/operators';

export class FilmStateModel {
    films: IFilm[];
    selectedFilm: IFilm;
}

@State<FilmStateModel>({
    name: 'films',
    defaults: {
        films: [],
        selectedFilm: null
    }
})
export class FilmState {
    constructor(private filmService: FilmService) {
    }

    @Selector()
    static getFilmList(state: FilmStateModel) {
        return state.films;
    }

    @Selector() getSelectedFilm(state: FilmStateModel) {
        return state.selectedFilm;
    }

    @Action(GetFilms)
    getFilms({getState, setState}: StateContext<FilmStateModel>) {
        return this.filmService.getFilms().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
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

    @Action(SetSelectedFilm)
    setSelectedFilmId({getState, setState}: StateContext<FilmStateModel>, {payload}: SetSelectedFilm) {
        const state = getState();
        setState({
            ...state,
            selectedFilm: payload
        });
    }

}