import withData from '../../lib/withData';

export default async (request, response) => {
  const isRequestAllowed = request.headers.api_token = process.env.get_data_token;

  const internalErrorResponse = (error = null) => {
    console.error(error);
    response.statusCode = 500;
    response.end(JSON.stringify({ error }));
  }

  if (isRequestAllowed) {
      try {
        const data = await withData(request.body).catch(error => internalErrorResponse(error));
        response.statusCode = 200;
        response.end(JSON.stringify({ data: data ?? {} }));
      } catch (error) {
        internalErrorResponse(error);
      }
  } else {
    response.statusCode = 401;
    response.end(JSON.stringify({ error: 'Unauthorized Access'}));
  }
}
