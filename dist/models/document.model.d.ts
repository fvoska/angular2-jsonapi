import { LinksModel } from './links.model';
export declare class DocumentModel<T> {
    private _links;
    private _data;
    constructor(body: any);
    readonly links: LinksModel;
    data: T;
}
