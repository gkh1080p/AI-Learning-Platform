<template>
  <div ref="dplayerContainer" class="dplayer-container"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import DPlayer from 'dplayer';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const dplayerContainer = ref(null);
    let dp = null;

    onMounted(() => {
      dp = new DPlayer({
        container: dplayerContainer.value,
        ...props.options,
      });
    });

    onBeforeUnmount(() => {
      if (dp) {
        dp.destroy();
      }
    });

    watch(
      () => props.options.video.url,
      (newUrl) => {
        if (dp && newUrl) {
          dp.switchVideo({ url: newUrl });
        }
      }
    );

    return {
      dplayerContainer,
    };
  },
};
</script>

<style scoped>
.dplayer-container {
  width: 100%;
  height: 100%;
}

</style>
