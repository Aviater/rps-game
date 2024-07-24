import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		version: 'v1.0.0',
		title: 'RPS Game',
		description: 'A multiplayer rock, paper, scissors game.'
	},
	servers: [
		{
			url: 'http://localhost:3000',
			description: 'Development server.'
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			}
		}
	}
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/game.ts', './src/routes/player.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
