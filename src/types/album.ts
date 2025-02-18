export interface Album {
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
}