import { Injectable } from '@nestjs/common';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class PostService {
  private posts: Post[] = [];

  async create(post: Post): Promise<Post> {
    this.posts.push(post);
    return post;
  }

  async findById(id: number): Promise<Post> {
    return this.posts.find((post) => post.id === id);
  }
}
