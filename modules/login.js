import axios from 'axios';
const API_URL = 'http://ec2-54-93-240-170.eu-central-1.compute.amazonaws.com/api';

const loginUser = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login/`,
            {
                username: username,
                password: password,
            }
            );
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
};

export { loginUser };
