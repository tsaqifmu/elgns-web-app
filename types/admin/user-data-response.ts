export type UserDataColumns = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  noHp: string;
  role: string;
  __v: number;
}

interface Message {
  docs: UserDocument[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface ApiResponse {
  error: boolean;
  message: Message;
}
