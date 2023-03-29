import { Route } from "@angular/router";
import { CharacterListPageComponent } from "./router/character/character-list-page/character-list-page.component";

export const routes: Route[] = [
    {path: '', redirectTo: 'characters', pathMatch: 'full'},
    {path: 'characters', component: CharacterListPageComponent},
];