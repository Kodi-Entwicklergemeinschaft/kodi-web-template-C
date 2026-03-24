export interface IInterest {
    status: string;
    data:   Datum[];
}

export interface IInterestDatum {
    id:             number;
    name:           string;
    available:      number;
    interest_order: number;
    image:          string;
}