import { API_ACCESS_TOKEN } from '@/configs/api'
import { CookieManager, CookieManagerInstace } from './cookie'
import {
  HasToken,
  TokenCreator,
  TokenDestroyer,
  TokenGetter,
  TokenUpdater,
} from './protocols/tokenManager'

export type AuthTokens = {
  accessToken?: string
  refreshToken?: string
}

export type AuthTokensConfig = {
  accessToken: any
  refreshToken: any
}

export interface AuthTokenManagerInstance
  extends TokenGetter<AuthTokens>,
    TokenCreator,
    TokenUpdater<AuthTokens>,
    TokenDestroyer,
    HasToken {}

const configsDefault = { accessToken: null, refreshToken: null }

export class AuthTokenManager implements AuthTokenManagerInstance {
  constructor(
    private readonly cookieManager: CookieManagerInstace = new CookieManager(),
    private readonly tokensName = {
      accessToken: API_ACCESS_TOKEN,
    }
  ) {}

  get(config: AuthTokensConfig = configsDefault): AuthTokens {
    return {
      accessToken: this.cookieManager.get(
        this.tokensName.accessToken,
        config.accessToken
      ),
    }
  }

  create(value: AuthTokens, config: AuthTokensConfig = configsDefault): void {
    this.cookieManager.create(
      this.tokensName.accessToken,
      value.accessToken,
      config.accessToken
    )
  }

  update(
    value: AuthTokens,
    config: AuthTokensConfig = configsDefault
  ): AuthTokens {
    this.cookieManager.update(
      this.tokensName.accessToken,
      value.accessToken,
      config?.accessToken
    )

    return this.get()
  }

  destroy(): void {
    this.cookieManager.destroy(this.tokensName.accessToken)
  }

  has(): boolean {
    return this.cookieManager.has(this.tokensName.accessToken)
  }
}
