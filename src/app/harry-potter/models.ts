type Raw<T, KI extends keyof T, O> = {
    [K in keyof T]: K extends KI ? O : T[K];
}

export type List<T> = {
    next: URL | null;
    previous: URL | null;
    results: T[];
}

export type RawList<T> = Raw<List<T>, 'next' | 'previous', string | null>;

export type SearchData = {
    search?: string;
    page?: string;
};

export type Character = {
    id: string;
    name: string;
    image: URL;
}

export type RawCharacter = Raw<Character, 'image', string>;