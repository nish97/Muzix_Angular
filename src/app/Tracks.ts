export interface ITracks {
  wished: boolean;
  name: string;
  duration: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: Streamable;
  artist: Artist;
  image: Image[];
  "@attr": Attr;
}

export interface Attr {
  rank: string;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
}

export interface Image {
  "#text": string;
  size: string;
}

export interface Streamable {
  "#text": string;
  fulltrack: string;
}
