import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Film, IPeople } from '../../interfaces/people';
import { GetFilms, GetPeople } from '../actions/swapi.actions';
import { DataService } from '../../services/data.service';
import { tap } from 'rxjs/operators';

export class SwapiStateModel {
    people: IPeople[];
    film: Film[];
}

@State<SwapiStateModel>({
    name: 'swapi',
    defaults: {
        people: [],
        film: []
    }
})
export class SwapiState {
    constructor(private dataService: DataService) {
    }

    @Action(GetPeople)
    getPeople({patchState}: StateContext<SwapiStateModel>) {
        return this.dataService.getPeople().pipe(tap((result) => {
            patchState({
                people: result,
            });
        }));
    }

    @Action(GetFilms)
    getFilms({patchState}: StateContext<SwapiStateModel>, {url}: GetFilms) {
        return this.dataService.getFilms(url).pipe(tap((result) => {
            patchState({
                film: result,
            });
        }));
    }
}