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
    likes: number,
    date: string
  ): Post => {
    const type = title.includes('시세표') ? Type.Price : Type.Normal
    switch (type) {
      case Type.Price:
        return new PricePost(title, link, hits, likes, date)
      case Type.Normal:
        return new NormalPost(title, link, hits, likes, date)
      default:
        throw new Error('invalid type')
    }
  }
}

abstract class Post {
  content?: string

  constructor(
    readonly title: string,
    readonly link: string,
    readonly hits: number,
    readonly likes: number,
    readonly date: string
  ) {
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

  constructor(
    title: string,
    link: string,
    hits: number,
    likes: number,
    date: string
  ) {
    super(title, link, hits, likes, date)
    this.type = Type.Price
  }
}
export class NormalPost extends Post {
  type: Type.Normal
  constructor(
    title: string,
    link: string,
    hits: number,
    likes: number,
    date: string
  ) {
    super(title, link, hits, likes, date)
    this.type = Type.Normal
  }
}
