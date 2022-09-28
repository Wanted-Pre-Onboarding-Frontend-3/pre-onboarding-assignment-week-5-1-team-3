import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const axiosInstance = axios.create({
	baseURL: 'https://pre-onboarding-assignment-week-5-1-team-3-server-wfe1.vercel.app/',
	Accept: 'application/json',
	headers: { 'Cache-Control': 'no-cache' },
	// TODO: 로컬 캐싱 작업
	adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
});

export default axiosInstance;
