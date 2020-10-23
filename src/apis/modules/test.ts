/**
 * api写法demo
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/8/6
*/
import { CustomerAxiosOptionsInterface } from '@/types/axios'
import { AxiosResponse } from 'axios'
import { get, post, upload, request } from '../request'
import { getDemo, postDemo, requestDemo } from '../types/test'

export default {
  /**
   * get demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param params
   * @param options
  * @returns {Promise<AxiosResponse>}
   */
  getTest(params: getDemo, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> {
    return get('/api/xxxx', params, options)
  },
  /**
   * get demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param data
   * @param options
   * @returns {Promise<AxiosResponse>}
   */
  postTest(data: postDemo, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> {
    return post('/api/xxxx', data, options)
  },
  /**
   * 上传demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param file {File} 需要上传的file
   * @param options
   * @returns {Promise<AxiosResponse>}
   */
  upload(file: File, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> {
    // 构建formdata
    const form = new FormData()
    form.append('file', file)
    const axiosRequestConfig = {
      data: form
    }
    return upload('/api/xxxxx', axiosRequestConfig, options)
  },
  /**
   * request 使用demo 注意此处options是可选参数，通常我们是不用的，只有需要特殊混入axios options时才需要
   * @param {requestDemo} data
   * @param {CustomerAxiosOptionsInterface} options
   * @returns {Promise<AxiosResponse>}
   */
  requestDemo(data: requestDemo, options: CustomerAxiosOptionsInterface): Promise<AxiosResponse> {
    return request({
      url: '/api/xxxx',
      method: 'PUT',
      data,
      baseUrl: 'http://localhost:9000/cmsk'
    }, options)
  },

  // =============================== 用于伪造首页数据  =======================================================
  getGoodsList() {
    return new Promise(resolve => {
      // =============================== 伪造测试数据  =======================================================
      const goodsListData = []
      const tags = ['包邮', '特价', '七天无理由退换', '优选']
      function randomTags(arr: any, count: number) {
        const shuffled = arr.slice(0)
        let i = arr.length
        const min = i - count
        let temp
        let index
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      }
      const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
      for (let i = 0; i < 10; i++) {
        goodsListData.push({
          title: '第' + i + '个商品',
          desc: '第' + i + '个商品的描述信息',
          tags: randomTags(tags, random(0, tags.length - 1)),
          num: random(1, i + 1),
          price: random(1, i + 1)
        })
      }
      // =============================== 伪造测试数据  =======================================================
      resolve({
        code: 0,
        data: goodsListData
      })
    })
  }
}
