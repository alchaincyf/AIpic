import axios from 'axios';
import { ImageGenerationRequest, ImageGenerationResponse } from './types.js';

export class ImageGenerator {
  private apiKey: string;
  private baseUrl = 'https://api-inference.modelscope.cn/v1/images/generations';
  private defaultModel = 'MusePublic/489_ckpt_FLUX_1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      const payload = {
        model: request.model || this.defaultModel,
        prompt: request.prompt,
        ...(request.width && { width: request.width }),
        ...(request.height && { height: request.height }),
        ...(request.steps && { steps: request.steps }),
        ...(request.guidance_scale && { guidance_scale: request.guidance_scale })
      };

      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.post(
        this.baseUrl,
        JSON.stringify(payload, null, 2),
        { headers }
      );

      if (!response.data || !response.data.images || !Array.isArray(response.data.images)) {
        throw new Error('Invalid response format from image generation API');
      }

      return {
        images: response.data.images.map((img: any) => ({
          url: img.url,
          width: img.width || 1024,
          height: img.height || 1024
        }))
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Image generation failed: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async generateMultipleImages(requests: ImageGenerationRequest[]): Promise<ImageGenerationResponse[]> {
    const promises = requests.map(request => this.generateImage(request));
    return Promise.all(promises);
  }
} 