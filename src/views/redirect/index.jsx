/**
 * 在spa(单页面应用)中，用户点击当前高亮的路由并不会刷新view，因为url并没有任何变化，所以它不会触发任何钩子。
 * SO，我们可以采取重定向的方案，判断跳转路由和当前路由是否一致，一致时，先跳转这，然后再重定向，这样就起到了刷新的效果了
 */
import { defineComponent } from 'vue';
export default defineComponent({
    beforeCreate() {
        const { params, query } = this.$route;
        const { path } = params;
        this.$router.replace({ path: '/' + path, query });
    },
    render() {
        return '';
    }
});
//# sourceMappingURL=index.jsx.map