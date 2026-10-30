// Set VITE_API_URL in client/.env to point at a deployed backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const AI_URL = import.meta.env.VITE_AI_URL || "http://localhost:8000";
export default BASE_URL;
