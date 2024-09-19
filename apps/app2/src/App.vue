<script lang="tsx">
import { BasicLayout } from '@wm/layouts';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return () => (
      <div class="a">
        <BasicLayout></BasicLayout>
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
