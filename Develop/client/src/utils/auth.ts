import { jwtDecode, JwtPayload } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    return !!this.getToken();
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return decoded.exp < Date.now() / 1000;
      }
      return true; // If there's no exp field, consider the token expired
    } catch (error) {
      return true; // If the token is invalid, consider it expired
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.href = '/';
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.href = '/login';
  }
}

export default new AuthService();