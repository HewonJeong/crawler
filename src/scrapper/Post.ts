export enum Type {
  Price,
  Normal,
}
/* utils */
export class PostFactory {
  static createPost = (
    title: string,
    link: string,
    hits: number,
    likes: number
  ): Post => {
    const type = title.includes('시세표') ? Type.Price : Type.Normal
    switch (type) {
      case Type.Price:
        return new PricePost(title, link, hits, likes)
      case Type.Normal:
        return new NormalPost(title, link, hits, likes)
      default:
        throw new Error('invalid type')
    }
  }
}

abstract class Post {
  title: string
  link: string
  hits: number
  likes: number
  content?: string

  constructor(title: string, link: string, hits: number, likes: number) {
    this.title = title
    this.link = link
    this.hits = hits
    this.likes = likes
  }
}
export default Post

export class PricePost extends Post {
  type: Type.Price
  imgSrc?: string

  constructor(title: string, link: string, hits: number, likes: number) {
    super(title, link, hits, likes)
    this.type = Type.Price
  }
}
export class NormalPost extends Post {
  type: Type.Normal
  constructor(title: string, link: string, hits: number, likes: number) {
    super(title, link, hits, likes)
    this.type = Type.Normal
  }
}
