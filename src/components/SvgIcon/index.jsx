/**
 * svg自动载入组件
 * @param iconClass { String } icon对应的唯一key，即svg文件名
 * @author huangchunmao
 * @email sujinw@qq.com
 * @version v1.0.0
 * @date 2020/10/12
*/
import { computed, defineComponent } from 'vue';
import styled from './icon.module.scss';
export default defineComponent({
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        }
    },
    setup(props, context) {
        const { iconClass } = props;
        const iconName = computed(() => {
            return `#icon-${iconClass}`;
        });
        return {
            iconName
        };
    },
    render() {
        return (<svg class={styled['svg-icon']} aria-hidden='true'>
        <use xlinkHref={this.iconName}/>
      </svg>);
    }
});
//# sourceMappingURL=index.jsx.map