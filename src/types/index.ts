
export type DetectionResult = {
  isGenuine: boolean;
  confidence: number;
  processingTime: number;
  modelUsed: string;
};

export type CurrencySample = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isGenuine: boolean;
};
