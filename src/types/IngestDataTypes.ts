export interface IngestDataType {
  names: {
    [region: string]: string[];
  };
  traits: string[];
  backgrouds: string[];
}

export interface CompendiumEntryType {
  name: string;
  type: 'name' | 'trait' | 'background';
  data: {
    description: string;
  };
}

export interface IngestResultType {
  status: 'success' | 'failure';
  message: string;
  details?: unknown;
}
