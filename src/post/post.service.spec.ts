import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  //test create
  it('should return post', async () => {
    const post = await service.create({
      id: 1,
      title: 'test',
      content: 'test content',
    });
    expect(post).toEqual({
      id: 1,
      title: 'test',
      content: 'test content',
    });
  });

  //test findById
  it('should return post', async () => {
    await service.create({
      id: 1,
      title: 'test',
      content: 'test content',
    });

    const foundPost = await service.findById(1);
    expect(foundPost).toEqual({
      id: 1,
      title: 'test',
      content: 'test content',
    });
  });
});
