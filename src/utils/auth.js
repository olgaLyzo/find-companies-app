export const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    const expire = localStorage.getItem('tokenExpire');
    if (!token || !expire)
        return false;
    return new Date(expire) > new Date();
};
