import axios from 'axios';
import { API_BASE } from '../config/env';

export const apiInstance = axios.create({
    baseURL: API_BASE,
});
