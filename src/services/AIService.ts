import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        try {
            const response = await streamText({
                model: openrouter('meta-llama/llama-3.3-8b-instruct:free'),
                prompt: prompt,
                system:'You are a bartender with 50 years of experience'
            });
            
            return response.textStream

        } catch (error) {
            console.error('Error en la llamada a la API:', error);
        }
    }
}
