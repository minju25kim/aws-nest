import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getBoards() {
    return await this.boardService.getBoards();
  }

  @Post()
  async createBoard(@Body('title') title: string) {
    return await this.boardService.createBoard(title);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string) {
    return await this.boardService.deleteBoard(parseInt(id));
  }
}
