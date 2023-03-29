import { Character, List, RawCharacter, RawList } from "./models";

export function parseList<I, O>(
    obj: RawList<I>,
    parser: (value: I) => O,
): List<O> {
    //console.log(obj);
    //console.log(typeof obj);
    return {
        ...obj,
        next: obj.next ? new URL(obj.next) : null,
        previous: obj.previous ? new URL(obj.previous) : null,
        results: obj.results?.map((value) => { console.log(value); return parser(value)}),
    };
}

export function parseCharacter(obj: RawCharacter): Character {
    console.log(typeof obj);
    console.log(obj);
    return {
        ...obj,
        image: new URL(obj.image),
    }
}

export function parseCharacterList(obj: RawList<RawCharacter>): List<Character> {
    return parseList(obj, parseCharacter);
}