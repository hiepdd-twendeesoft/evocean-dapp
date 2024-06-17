export interface ITheme {
    name: string;
    theme: string;
    overview: string,
    selling_price: number;
    owner_price: number;
    previews: string;
    //   pages: t.Optional(t.Array(t.String())),
    //   format: t.Optional(t.Array(t.String())),
    //   categories: t.Optional(t.Array(t.String())),
    //   highlight: t.Optional(t.Array(t.String())),
    //   live_preview: t.Optional(t.String()),
    //   template_features: t.Optional(t.Array(t.String())),
    //   figma_features: t.Optional(t.Array(t.String()))
}

export type TCreateTheme = {
    theme?: File;
    name: string;
    overview: string,
    selling_price: number,
    owner_price: number,
    previews?: File[];
}
