export interface ImageGenerationRequest {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidance_scale?: number;
}

export interface ImageGenerationResponse {
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
}

export interface WebPageAnalysis {
  title: string;
  imageRequirements: ImageRequirement[];
  overallTheme: string;
  colorScheme: string;
  style: string;
}

export interface ImageRequirement {
  id: string;
  selector: string;
  description: string;
  suggestedPrompt: string;
  dimensions: {
    width: number;
    height: number;
  };
  alt?: string;
  context: string;
}

export interface ArticleAnalysis {
  title: string;
  content: string;
  imageRequirements: ImageRequirement[];
  theme: string;
  tone: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  dimensions: {
    width: number;
    height: number;
  };
  generatedAt: Date;
} 