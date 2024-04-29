import { ThemeObject } from "./interfaces";
export interface Theme {
    light?: ThemeObject;
    dark?: ThemeObject;
    error?: string;
}
export declare function mdctotheme(from: string | File | Event | HTMLImageElement, radius: number): Promise<Theme>;
