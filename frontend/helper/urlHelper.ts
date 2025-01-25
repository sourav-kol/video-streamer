const baseURL = "http://localhost:5000";

export const generateServerURL = (path: string): string => {
    path = path.replace(/^\/+/, "");
    return `${baseURL}/${path}`;
}