import { ref, onMounted, onUnmounted, nextTick } from "vue";

export function useSearchInput() {
  const isActive = ref(false);
   // 零时的出现个人主页islong为true
  const isLogin=ref(true)
  const keyword = ref("");
  const searchBox = ref<any>(null); // 使用 any 或具体组件类型

  const openSearch = () => {
    isActive.value = true;
    nextTick(() => {
      const input = searchBox.value?.$el?.querySelector("input");
      if (input) {
        input.focus();
        // 解决部分浏览器焦点问题
        setTimeout(() => input.focus(), 50);
      }
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!isActive.value) return; // 关键修复：未激活时不处理
    const boxEl = searchBox.value?.$el;
    if (boxEl && !boxEl.contains(event.target as Node)) {
      isActive.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return { isActive,isLogin, keyword, searchBox, openSearch };
}