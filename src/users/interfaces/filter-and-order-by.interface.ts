export interface FindAllOptions {
  role?: 'ADMIN' | 'USER';
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}
