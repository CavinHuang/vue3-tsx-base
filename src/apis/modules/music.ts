/**
 * 段子请求demo,真实数据
 */

import { AxiosResponse } from 'axios'
import { get } from '../request'
export default {
  // https://api.apiopen.top
  getList(): Promise<AxiosResponse> {
    return get('/testApi/musicRankingsDetails?type=1')
  }
}