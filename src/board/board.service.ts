import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  async getBoards() {
    return {
      result: 'Get',
    };
  }

  async createBoard(title: string) {
    return {
      result: `Create ${title}`,
    };
  }

  async deleteBoard(id: number) {
    return {
      result: `Delete ${id}`,
    };
  }
}
