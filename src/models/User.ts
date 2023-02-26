export interface UserInfo {
  name?: string;
  age?: number;
}
export class User {
  constructor(private data: UserInfo) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserInfo): void {
    // Object.assign(this.data, update);
    this.data = { ...this.data, ...update };
  }
}
