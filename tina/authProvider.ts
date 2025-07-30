import { UsernamePasswordAuthJSProvider as BaseAuthProvider } from "tinacms-authjs/dist/tinacms";
import type { BackendAuthProvider } from "@tinacms/datalayer";

export class WrappedAuthProvider implements BackendAuthProvider {
  private base = new BaseAuthProvider();

  async isAuthorized() {
    const authorized = await this.base.isAuthorized();

    if (authorized === true) {
      return { isAuthorized: true as const };
    }

    return {
      isAuthorized: false as const,
      errorMessage: "Unauthorized",
      errorCode: 401,
    };
  }

  async authorize() {
    return this.base.authorize();
  }

  async logout() {
    return this.base.logout();
  }
}