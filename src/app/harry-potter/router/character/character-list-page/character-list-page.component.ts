import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable, switchMap } from 'rxjs';
import { Character, List, SearchData } from 'src/app/harry-potter/models';
import { CharacterService } from 'src/app/harry-potter/services/character.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterListComponent } from 'src/app/harry-potter/character/character-list/character-list.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-character-list-page',
  standalone: true,
  imports: [CommonModule, CharacterListComponent],
  templateUrl: './character-list-page.component.html',
  styleUrls: ['./character-list-page.component.scss']
})
export class CharacterListPageComponent {
  protected readonly data$: Observable<List<Character>>;

  protected searchData: SearchData | undefined;

  constructor(dataService: CharacterService, private readonly route: ActivatedRoute,
    private readonly router: Router) {
      this.searchData = route.snapshot.queryParams;
      this.data$ = route.queryParams.pipe(switchMap((params) => dataService.getAll(params)));
    }

  protected search(searchData: SearchData): void {
    this.router.navigate([], {
      queryParams: searchData,
      replaceUrl: true,
    });
  }

  protected doSelect(item: Character): void {
    
  }
}
