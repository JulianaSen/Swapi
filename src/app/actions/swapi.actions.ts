import { Film, IPeople } from '../../interfaces/people';

export class GetFilms {
    static readonly type = '[Film] Get';
    constructor(public url: string) {
    }
}

export class GetPeople {
    static readonly type = '[IPeople] Get';
}
