/**
 * 测试接口interface
 */

export interface getDemo {
  current: number;
  pageSize: number;
  title?: string;
  author?: string;
}

export interface postDemo {
  id: string;
  title: string;
  content: string;
}

export interface requestDemo extends postDemo {

}