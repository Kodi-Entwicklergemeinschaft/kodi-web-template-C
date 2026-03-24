export interface ICities {
    status: string;
    data:   ICityDatum[];
}

export interface ICityDatum {
    id:       number;
    name:     string;
    image:    null;
    hasForum: null;
}