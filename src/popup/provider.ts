import { InjectionKey, ref } from 'vue';
import { Chapters } from '../utils/getChapters';

export const useNYobikoProvider = () => {
  const chapters = ref<Chapters>();
  const error = ref<boolean>(true);
  const loading = ref<boolean>(true);

  chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    if (!tab.id) return;
    try {
      chrome.tabs.sendMessage(tab.id, {method: 'getDetail'}, (res: Chapters | null) => {
        if (res) chapters.value = res;
      });
    } catch (e) {
      error.value = false;
    } finally {
      loading.value = false;
    }
  });

  return {
    chapters,
    error,
    loading
  }
}

export type NYobikoProviderStore = ReturnType<typeof useNYobikoProvider>;
export const NYobikoKey: InjectionKey<NYobikoProviderStore> = Symbol('NYobiko');
