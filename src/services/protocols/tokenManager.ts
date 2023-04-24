export interface TokenGetter<T> {
  get(config?: any): T
}

export interface TokenCreator {
  create(value: any, config?: any): void
}

export interface TokenUpdater<T> {
  update(value: any, config?: any): T
}

export interface TokenDestroyer {
  destroy(): void
}

export interface HasToken {
  has(): boolean
}
