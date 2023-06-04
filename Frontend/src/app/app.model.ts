export type PageTypes = '' | 'rank' | 'token' | 'summary';

export type StateTypes = '' | 'discardedCards' | 'reposition' | 'tokenSummary';

export interface ICurrentPageAndState {
    page: PageTypes,
    state: StateTypes
}

export interface ICardData {
    label: string,
    preview: string,
    imageUrl: string,
    content: string
}

export interface ICardsData {
    [cardLabel: string]: ICardData
}

export interface ITokens {
    [tokenName: string]: {
        label: string,
        color: string
    }
}

export interface IPlacedCard {
    label: string,
    x: number,
    y: number,
    'z-index': number,
    tokens: Set<string>
}