import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, QueryHandlers } from './handlers';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [CqrsModule],
  controllers: [PostController],
  providers: [PostService, ...CommandHandlers, ...QueryHandlers],
})
export class PostModule {}
