import { ComponentInternalInstance } from 'vue'

export interface CurrentInstanceInterface extends ComponentInternalInstance {
  $api?: any
}