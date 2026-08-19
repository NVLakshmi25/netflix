import OpenAI from 'openai';
import { OPENAI_KEY } from './Constants';

const openai = new OpenAI({
  apiKey:OPENAI_KEY, // This is the default and can be omitted
   dangerouslyAllowBrowser: true // Only for client-side usage, be cautious
});

export default openai ;