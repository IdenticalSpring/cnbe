import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiApiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.API_KEY_GEMINI;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      return result.response.text(); 
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }
}
