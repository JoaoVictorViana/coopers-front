export interface CookieGetter {
  get(name: string, config?: any): string | undefined
}

export interface CookieCreator {
  create(name: string, value: any, config?: any): void
}

export interface CookieUpdater {
  update(name: string, value: any, config?: any): string | undefined
}

export interface CookieDestroyer {
  destroy(name: string): void
}

export interface HasCookie {
  has(name: string): boolean
}
