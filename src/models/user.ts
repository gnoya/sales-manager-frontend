export interface User {}

export function transformUser(data: any): User {
  return {} as User
}

export function transformUserArray(data: any): User[] {
  return data.map((item: any) => transformUser(item))
}
