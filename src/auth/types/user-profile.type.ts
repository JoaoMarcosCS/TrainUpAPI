export type Photo = {
    value: string;
}

export type Email = {
    value: string;
}

export type ProfileGoogle = {
    emails: Email [];
    photos: Photo[]
    displayName: string;
    googleId: string;

}