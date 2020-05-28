import { hostWhitelist } from '../../lib/constants';
import withData from '../../lib/withData';

export default async (request, response) => {
  const isRequestAllowed = hostWhitelist.includes(request.headers.host);

  if (isRequestAllowed) {
      await withData(request.body).then(data => {
        response.statusCode = 200;
        response.end(JSON.stringify({ data }));
      }).catch(err => {
        response.statusCode = 500;
        response.end(JSON.stringify({ error: err }));
      });
  } else {
    response.statusCode = 401;
    response.end(JSON.stringify({ error: 'Unauthorized Access'}));
  }
}
