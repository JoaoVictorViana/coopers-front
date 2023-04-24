import { getCookie, setCookie, deleteCookie, hasCookie } from 'cookies-next'
import {
  CookieCreator,
  CookieDestroyer,
  CookieGetter,
  CookieUpdater,
  HasCookie,
} from './protocols/cookieManager'

export interface CookieManagerInstace
  extends CookieCreator,
    CookieGetter,
    CookieUpdater,
    CookieDestroyer,
    HasCookie {}

export class CookieManager implements CookieManagerInstace {
  create(name: string, value: any, config: any = {}) {
    setCookie(name, value, config)
  }

  get(name: string, config: any = {}) {
    return getCookie(name, config)?.toString()
  }

  update(name: string, value: any, config: any = {}): string | undefined {
    setCookie(name, value, config)

    return this.get(name, config)
  }

  destroy(name: string): void {
    deleteCookie(name)
  }

  has(name: string): boolean {
    return hasCookie(name)
  }
}
