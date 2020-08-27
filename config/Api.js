import { Alert } from 'react-native';


//default endpoint (STG for now)
const endPoint = 'https://xpressleadpro.com/portal/public/digitalbackpack/request';
//default error message for failures
const invalidRequest = { isValid: false, msg: "Error making request. Please try again" };

/*
* data is an object
* badge, showcode, lastname required for API
*/
export function sendMail(data) {

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .catch((error) => {
            return invalidRequest;
        });
}
