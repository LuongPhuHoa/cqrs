import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/createPostCommand.command';
import { GetPostQuery } from './queries/getPostQuery.query';

// controller that implements command
@Controller('posts')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createPost(@Body() body: { title: string; content: string }) {
    const { title, content } = body;
    const command = new CreatePostCommand(title, content);
    const post = await this.commandBus.execute(command);
    return post;
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    const query = new GetPostQuery(id);
    const post = await this.queryBus.execute(query);
    return post;
  }
}
