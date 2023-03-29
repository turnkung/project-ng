import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Character, List, SearchData } from '../../models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit { 
  @Input() data!: List<Character>;
  @Input() search?: SearchData;

  @Output() searchChange = new EventEmitter<SearchData>();
  @Output() itemSelected = new EventEmitter<Character>();

  protected formGroup!: FormGroup<{
    search: FormControl<string>;
  }>;

  private fb: NonNullableFormBuilder;

  public list: Character[] = [];

  constructor(fb: FormBuilder) {

    this.fb = fb.nonNullable;
  }

  ngOnInit(): void {

    if (!this.data) {
      throw new Error('Data is required!');
    }

    console.log(this.data);
    //this.list = Object.entries(this.data).map((id) => { console.log(id); return ({ id: 'ttttt', name: 'tttt', image: new URL('https://ik.imagekit.io/hpapi/harry.jpg') })});
    //this.list = Object.entries(this.data).map(([id, name, ]) => ({ id, name: name['name'] as string, image: new URL('https://ik.imagekit.io/hpapi/harry.jpg') }));
    //console.log(Object.getOwnPropertyNames(this.list[0].name));

    //this.list = Object.entries(this.data).map(([ id, name, image ]) => ({ id, name, image: new URL('sss')}));

    this.formGroup = this.fb.group({
      search: this.search?.search?? '',
    });
  }

  protected get pageOffset(): number {
    return (+(this.search?.page ?? 1) - 1) * 10;
  }

  protected doSearch(): void {
    const value = this.formGroup.value;

    if (value.search) {
      this.searchChange.emit(this.formGroup.value);
    } else {
      this.doClear();
    }
  }

  protected doClear(): void {
    this.formGroup.setValue({search: '' });
    this.searchChange.emit({});
  }

  protected changePage(searchParms?: URLSearchParams): void {
    const search = searchParms?.get('search');
    const page = searchParms?.get('page');

    const SearchData = {
      ...(search ? { search } : {}),
      ...(page ? { page } : {}),
    };

    this.searchChange.emit(SearchData);
  }

  protected doSelect(item: Character): void {
    this.itemSelected.emit(item);
  }
}
