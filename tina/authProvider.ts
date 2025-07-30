import { UsernamePasswordAuthJSProvider as BaseAuthProvider } from 'tinacms-authjs/dist/tinacms';
import type { BackendAuthProvider } from '@tinacms/datalayer';

export class WrappedAuthProvider implements BackendAuthProvider {
  private baseProvider = new BaseAuthProvider();

  async isAuthorized(): Promise<
    | { isAuthorized: true }
    | { isAuthorized: false; errorMessage: string; errorCode: number }
  > {
    const authorized = await this.baseProvider.isAuthorized();

    // authorized might be a boolean, so explicitly convert it:
    if (authorized === true) {
      return { isAuthorized: true };
    } else {
      return {
        isAuthorized: false,
        errorMessage: 'Unauthorized',
        errorCode: 401,
      };
    }
  }

  async authorize() {
    return this.baseProvider.authorize();
  }

  async logout() {
    return this.baseProvider.logout();
  }
}