// src/ai/flows/personalized-guidance.ts
'use server';

/**
 * @fileOverview A flow for providing personalized guidance on debt resolution.
 *
 * - personalizedGuidance - A function that provides personalized guidance based on user input.
 * - PersonalizedGuidanceInput - The input type for the personalizedGuidance function.
 * - PersonalizedGuidanceOutput - The return type for the personalizedGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedGuidanceInputSchema = z.object({
  responses: z
    .string()
    .describe(
      'The user responses to the initial questions from the Jotform bot.'
    ),
});
export type PersonalizedGuidanceInput = z.infer<typeof PersonalizedGuidanceInputSchema>;

const PersonalizedGuidanceOutputSchema = z.object({
  guidance: z.string().describe('Personalized guidance based on user responses.'),
  strategySuggestion: z
    .string()
    .describe('Suggested debt resolution strategies.'),
});
export type PersonalizedGuidanceOutput = z.infer<typeof PersonalizedGuidanceOutputSchema>;

export async function personalizedGuidance(input: PersonalizedGuidanceInput): Promise<PersonalizedGuidanceOutput> {
  return personalizedGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedGuidancePrompt',
  input: {schema: PersonalizedGuidanceInputSchema},
  output: {schema: PersonalizedGuidanceOutputSchema},
  prompt: `You are an AI bot specializing in financial debt resolution.
  Based on the user's responses to the initial questions:
  {{responses}}

  Provide personalized guidance and suggest the most appropriate debt resolution strategies for the user's situation.
  Consider options like debt agreements and liquidation.
  The answer should be concise and actionable.
  `,
});

const personalizedGuidanceFlow = ai.defineFlow(
  {
    name: 'personalizedGuidanceFlow',
    inputSchema: PersonalizedGuidanceInputSchema,
    outputSchema: PersonalizedGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
