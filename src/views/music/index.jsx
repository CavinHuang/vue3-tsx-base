import { defineComponent, getCurrentInstance, reactive } from 'vue';
import { $api } from '@/assets/scripts/utils/sfcGlobalConfig';
export default defineComponent({
    setup() {
        const { music } = $api(getCurrentInstance());
        const musicData = reactive({
            lists: []
        });
        const fetchList = () => {
            music.getList().then((res) => {
                musicData.lists = res;
            });
        };
        fetchList();
        return {
            musicData
        };
    },
    render() {
        const goodsLists = this.musicData.lists.map((item, index) => {
            return (<van-card num={item.num} price={item.price} desc={item.desc} title={item.title} thumb={item.pic_premium} key={'goods_item' + index}>
        </van-card>);
        });
        return (<van-row>
        {goodsLists}
      </van-row>);
    }
});
//# sourceMappingURL=index.jsx.map