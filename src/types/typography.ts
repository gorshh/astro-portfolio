export type TypographySize =
  | "display-xxl"
  | "display-xl"
  | "display-lg"
  | "heading-xl"
  | "heading-lg"
  | "body"
  | "body-sm"
  | "strong";

export type TypographyAlign = "left" | "center" | "right";

export interface TypographyProps {
  as?: keyof HTMLElementTagNameMap; // Soporta cualquier etiqueta HTML
  size?: TypographySize; // Tamaño tipográfico
  align?: TypographyAlign; // Alineación del texto
  class?: string; // Clases adicionales (colores, márgenes, etc.)
  fontFamily?: "pp-mori" | "system";
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase'
}

export const defaultSizes: Partial<Record<keyof HTMLElementTagNameMap, TypographySize>> = {
  h1: "display-xxl",
  h2: "display-xl",
  h3: "display-lg",
  h4: "heading-xl",
  h5: "heading-lg",
  p: "body",
  small: "body-sm",
  strong: "strong",
};
