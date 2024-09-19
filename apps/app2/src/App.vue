<script lang="tsx">
import { BasicLayout } from '@wm/layouts';
import { defineComponent } from 'vue';
import HelloWorld from '/@/components/HelloWorld.vue';
export default defineComponent({
  setup() {
    return () => (
      <div class="a">
        <BasicLayout></BasicLayout>
        <HelloWorld></HelloWorld>
      </div>
    );
  },
});
</script>
<style lang="less" scoped>
.a {
  color: red;
}
</style>
