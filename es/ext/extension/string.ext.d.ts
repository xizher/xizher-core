export interface IStringExtension {
    trimAll(): string;
    toDate(): Date;
    toDateFormat(fmt: string): string;
}
declare function extString(str: string): IStringExtension;
export default extString;
