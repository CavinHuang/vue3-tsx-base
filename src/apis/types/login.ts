/**
 * 登录相关的api接口管理
 */

export interface SsoInterface {
  accountId: string;
  accessToken: string;
  name: string;
  fromChannel: string;
  token: string;
}