export interface RegionData {
  [region: string]: string[];
}

export interface SPCActorData {
  name: string;
  type: 'spc';
  img?: string;
  system: Partial<{
    notes: string;
    generaldifficulty: {
      strongest: {
        value: number | null;
      };
      normal: {
        value: number | null;
      };
    };
    health: {
      aggravated?: number;
      superficial?: number;
      max: number;
      value: number;
    };
    willpower: {
      aggravated?: number;
      superficial?: number;
      max: number;
      value: number;
    };
    standarddicepools: {
      physical: {
        value: number | null;
      };
      social: {
        value: number | null;
      };
      mental: {
        value: number | null;
      };
    };
    exceptionaldicepools?: {
      [key: string]: {
        value: number;
        visible: boolean;
      };
    };
    disciplines?: {
      [key: string]: {
        description: string;
        value: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        powers: any[];
        visible: boolean;
      };
    };
    spcType: string;
    gamesystem: 'mortal';
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects?: any[];
  folder?: string | null;
  sort?: number;
  ownership?: {
    default: number;
    [key: string]: number;
  };
  flags?: Record<string, unknown>;
}
