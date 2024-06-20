export interface ITheme {
    id: number;
    zip_link: string;
    name: string;
    overview: string;
    media: {
      previews: string[];
      figma_features: any[];
      template_features: any[];
      categories: string[];
      format: string[];
      hightlight: string[];
      live_preview: string;
      pages: string[];
    };
    owner_addresses: string[];
    token_mint: string;
    author_address: string;
    sale: null | {
      theme_id: number;
      price: string;
    };
    listing: null | {
      theme_id: number;
      price: string;
    };
  }
  
  export interface IThemeItem {
    id: number;
    earning:  string | null | undefined;
    price:  string | null | undefined;
    name: string;
    sales: number;
    thumbnail: string;
}


export type TCreateTheme = {
  id?: number;
  theme?: File;
  name: string;
  overview: string,
  selling_price: number,
  owner_price: number,
  previews?: File[];
  thumbnail?: File,
  template_features: string[];
  figma_features: string[];
  status?: EThemeStatus
}

export type TCreateThemeSchema = {
  name: string;
  overview: string,
  selling_price: number,
  owner_price: number,
  template_features:  string;
  figma_features:  string;
}

export enum EThemeStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}