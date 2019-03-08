import axios from 'axios';
 // this url shouldn't be global because authentication will use a different url
const instance = axios.create({
    baseURL:'https://react-my-burger-d157c.firebaseio.com'
});

export default instance;