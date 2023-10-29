import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';
import { PRIVATE_SUPABASE_KEY } from '$env/static/private';
import { PRIVATE_OPENAI_KEY } from '$env/static/private';

// https://dev.to/khromov/configure-cors-in-sveltekit-to-make-fetch-requests-to-your-api-routes-from-a-different-host-241k
export const OPTIONS: RequestHandler = async () => {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': '*'
		}
	});
};

// TODO: https://supabase.com/blog/openai-embeddings-postgres-vector ou https://groff.dev/blog/openai-embeddings-supabase
// OU: https://platform.openai.com/docs/guides/fine-tuning


const openai = new OpenAI({
	apiKey: PRIVATE_OPENAI_KEY
});
export const POST: RequestHandler = async (data) => {
	// const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_KEY);

	// Extract the `prompt` from the body of the request
	const { messages } = await data.request.json();
	// Ask OpenAI for a streaming chat completion given the prompt
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages: messages.map((message: any) => ({
			content: message.content,
			role: message.role
		}))
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);

};
