export interface FileUpload {
    name: string;
    data: any;
    size: number;
    encoding: string;
    tempFilePath: string;
    truncated: string;
    mimetype: string;
    md5: string;

    mv: Function;
}