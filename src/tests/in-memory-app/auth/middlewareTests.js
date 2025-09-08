import pkg from 'jsonwebtoken';
const { verify } = pkg;

export class MiddlewareTests {

    async ensureUserAuthenthicated(request, response) {

        try {

            const authToken = request.headers.authorization;
            const [, token] = authToken.split(' ');

            verify(token, process.env.SECRET, {
                audience: "users",
                issuer: "ADMIN"
            });

            return true;

        }catch(error) {

            if(error) {
                return error.message;
            }
            
        }

    }

}