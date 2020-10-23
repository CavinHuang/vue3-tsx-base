import { $api } from '@/assets/scripts/utils/sfcGlobalConfig';
import { inject, reactive, ref, getCurrentInstance, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'HomeIndex',
    setup() {
        const $app = inject('$app');
        const total = ref(0);
        const $router = useRouter();
        const state = reactive({
            goodsList: []
        });
        // 获取全局的api
        const { test } = $api(getCurrentInstance());
        // 计算总额
        const reduceTotal = () => {
            total.value = 0;
            state.goodsList.forEach(cur => {
                const { price, num } = cur;
                total.value += price * num;
            });
        };
        // 获取接口
        const getGoodsList = () => {
            test.getGoodsList().then((res) => {
                console.log('获取的数据', res);
                state.goodsList = res.data;
                reduceTotal();
            });
        };
        // 刷新当前页面
        const reloadPage = () => {
            $app.reload();
        };
        // 加
        const addNum = (index) => {
            const item = state.goodsList[index];
            item.num++;
            reduceTotal();
        };
        // 减
        const rediusNum = (index) => {
            const item = state.goodsList[index];
            item.num--;
            reduceTotal();
        };
        // 提交
        const onSubmit = () => {
            alert(total.value);
        };
        // 路由跳转
        const goMusic = () => {
            $router.push({
                path: '/music'
            });
        };
        // 调用接口获取数据
        getGoodsList();
        return {
            state,
            total,
            reloadPage,
            goMusic,
            addNum,
            onSubmit,
            rediusNum
        };
    },
    render() {
        const goodsLists = this.state.goodsList.map((item, index) => {
            return (<van-card num={item.num} price={item.price} desc={item.desc} title={item.title} thumb='https://img.yzcdn.cn/vant/ipad.jpeg' key={'goods_item' + index} v-slots={{
                tags: () => {
                    console.log(item);
                    return item.tags.map((tag, idx) => {
                        return (<van-tag plain type='danger' key={'tag' + idx} style='margin-right: 10px;'>{tag}</van-tag>);
                    });
                },
                footer: () => {
                    return (<fragment>
                  <van-button type='success' size='mini' onClick={() => this.addNum(index)}>+</van-button>
                  <van-button size='mini' onClick={() => this.rediusNum(index)}> -</van-button>
                </fragment>);
                }
            }}>
        </van-card>);
        });
        return (<div style='margin-bottom: 80px'>
        <h1>测试页面{this.total}</h1>
        {goodsLists}
        <van-submit-bar price={this.total * 100} button-text='提交订单' onSubmit={() => this.onSubmit()}></van-submit-bar>
        <van-button type='success' onClick={() => this.reloadPage()}> 刷新当前页面</van-button>
        <van-button type='success' onClick={() => this.goMusic()}> 前往音乐列表demo</van-button>
        <h1>svg 组件</h1>
        <svg-icon icon-class='hart' style='height: 40px; width: 40px'></svg-icon>
      </div>);
    }
});
//# sourceMappingURL=index.jsx.map