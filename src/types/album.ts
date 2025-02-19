export interface Album {
  id: string;
  albumTitle: string;
  albumLink: string;
  artistName: string;
  artistLink: string;
  images: Array<{
    label: string;
    attributes: {
      height: string;
    };
  }>;
  imageLink: string;
  releaseDate: Date;
  genre: string;
}
