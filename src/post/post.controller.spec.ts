import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('PostController', () => {
  let controller: PostController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: CommandBus, useValue: { execute: jest.fn() } },
        { provide: QueryBus, useValue: { execute: jest.fn() } },
      ],
      controllers: [PostController],
    }).compile();

    controller = module.get<PostController>(PostController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  //test post request
  it('POST: should return post', async () => {
    const mockPost = { title: 'test', content: 'test content' };
    jest.spyOn(commandBus, 'execute').mockResolvedValue(mockPost);

    const post = await controller.createPost(mockPost);
    expect(post).toEqual(mockPost);
  });

  //test get request
  it('GET: should return post', async () => {
    const mockPost = { id: 1, title: 'test', content: 'test content' };
    jest.spyOn(queryBus, 'execute').mockResolvedValue(mockPost);

    const post = await controller.getPost(1);
    expect(post).toEqual(mockPost);
  });
});
