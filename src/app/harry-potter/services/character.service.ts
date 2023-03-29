import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, List, RawCharacter, RawList, SearchData } from '../models';
import { map, Observable } from 'rxjs';
import { parseCharacterList } from '../helpers';

const url = 'https://hp-api.onrender.com/api/characters'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private readonly http: HttpClient) {}

  getAll(SearchData?: SearchData): Observable<List<Character>> {
    return this.http
           .get<RawList<RawCharacter>>(url, { params: SearchData })
           .pipe(map((obj) => parseCharacterList(obj)));
  }
}
