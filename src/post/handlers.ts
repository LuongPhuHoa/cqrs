/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/createPostCommand.command';
import { GetPostQuery } from './queries/getPostQuery.query';
import { PostService } from './post.service';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private readonly postService: PostService) {}

  async execute(command: CreatePostCommand) {
    const { title, content } = command;
    const post = await this.postService.create({
      title, content, id: Math.floor(Math.random() * 1000),
    });
    console.log('handler: ', post);
    return post;
  }
}

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(private readonly postService: PostService) {}

  async execute(query: GetPostQuery) {
    const { id } = query;
    const post = await this.postService.findById(id);
    return post;
  }
}

export const CommandHandlers = [CreatePostHandler];
export const QueryHandlers = [GetPostHandler];