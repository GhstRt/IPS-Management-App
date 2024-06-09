import axios from 'axios';
const API_URL = 'http://10.0.2.2:8000/api';

const loginUser = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login/`,
            {
                username: username,
                password: password,
            }
            );
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
};

export { loginUser };
