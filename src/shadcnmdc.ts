import { getAverageColor } from "fast-average-color-node";
import Color from "color";
import { ThemeObject } from "./interfaces";
import { readFileSync } from "fs";

export interface Theme {
  light?: ThemeObject;
  dark?: ThemeObject;
  error?: string;
}

export async function mdctotheme(
  from: string | File | Event | HTMLImageElement,
  radius: number
): Promise<Theme> {
  if (radius <= 0 || radius >= 1) {
    throw new Error("[shadcn mdc] radius must be between 0 and 1.");
  }
  const data: any = from;
  try {
    // color support
    if (typeof data === "string" && /^\#[0-9a-f]+$/i.test(data)) {
      const color = Color(data);
      return ThemetoJson(color.hex(), radius);
    }
    // url image support
    if (typeof data === "string" && /^(http|https):\/\/[^ "]+$/.test(data)) {
      const color = await getAverageColor(data);
      return ThemetoJson(color.hex, radius);
    }
    // blob support
    else {
      const buffer = buffer_image(data);
      const color = await getAverageColor(buffer);
      return ThemetoJson(color.hex, radius);
    }
  } catch (error) {
    return { light: undefined, dark: undefined, error: String(error) };
  }
}

function ThemetoJson(color: string, radius: number) {
  const mainColor = Color(color).hsl();
  const light_theme = {
    background: mainColor
      .hsl()
      .saturationl(100)
      .lightness(95)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(10)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    card: mainColor
      .hsl()
      .saturationl(50)
      .lightness(90)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    card_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(15)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    popover: mainColor
      .hsl()
      .saturationl(100)
      .lightness(95)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    popover_foreground: mainColor
      .hsl()
      .saturationl(100)
      .lightness(10)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    primary: mainColor
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    primary_foreground: mainColor
      .hue(0)
      .saturationl(0)
      .lightness(100)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    secondary: mainColor
      .hsl()
      .saturationl(30)
      .lightness(70)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    secondary_foreground: mainColor
      .hue(0)
      .saturationl(0)
      .lightness(0)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    muted: mainColor
      .hue(mainColor.hue() - 38)
      .saturationl(30)
      .lightness(85)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    muted_foreground: mainColor.hsl().saturationl(5).lightness(35).string(),
    accent: mainColor
      .hue(mainColor.hue() - 38)
      .saturationl(30)
      .lightness(80)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    accent_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(15)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    destructive: mainColor
      .hue(0)
      .saturationl(100)
      .lightness(30)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    destructive_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(90)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    border: mainColor
      .hsl()
      .saturationl(30)
      .lightness(50)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    input: mainColor
      .hsl()
      .saturationl(30)
      .lightness(26)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    ring: mainColor
      .hsl()
      .saturationl(36)
      .lightness(54)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    radius: radius,
  };

  const dark_theme = {
    background: mainColor
      .hsl()
      .saturationl(50)
      .lightness(10)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(90)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    card: mainColor
      .hsl()
      .saturationl(50)
      .lightness(10)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    card_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(90)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    popover: mainColor
      .hsl()
      .saturationl(50)
      .lightness(5)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    popover_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(90)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    primary: mainColor
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    primary_foreground: mainColor
      .hue(0)
      .saturationl(0)
      .lightness(100)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    secondary: mainColor
      .hsl()
      .saturationl(30)
      .lightness(20)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    secondary_foreground: mainColor
      .hue(0)
      .saturationl(0)
      .lightness(100)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    muted: mainColor
      .hue(mainColor.hue() - 38)
      .saturationl(30)
      .lightness(25)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    muted_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(60)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    accent: mainColor
      .hue(mainColor.hue() - 38)
      .saturationl(30)
      .lightness(25)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    accent_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(90)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    destructive: mainColor
      .hue(0)
      .saturationl(100)
      .lightness(30)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    destructive_foreground: mainColor
      .hsl()
      .saturationl(5)
      .lightness(90)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    border: mainColor
      .hsl()
      .saturationl(30)
      .lightness(26)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    input: mainColor
      .hsl()
      .saturationl(30)
      .lightness(26)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    ring: mainColor
      .hsl()
      .saturationl(36)
      .lightness(54)
      .string()
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .replace(",", ""),
    radius: radius,
  };
  return { light: light_theme, dark: dark_theme };
}

/**
 * Reads an image file from the given file path and returns the contents as a Buffer.
 *
 * @param {string} filePath - The path of the image file.
 * @return {Buffer} The contents of the image file as a Buffer.
 */
function buffer_image(filePath: string): Buffer {
  /**
   * Reads the contents of a file from the given file path and returns it as a Buffer.
   *
   * @param {string} filePath - The path of the file to read.
   * @return {Buffer} The contents of the file as a Buffer.
   */
  const readFile = (filePath: string): Buffer => {
    const buffer = readFileSync(filePath);
    return buffer;
  };

  // Call the readFile function and return the buffer.
  return readFile(filePath);
}
