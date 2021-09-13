import { ref } from "@vue/reactivity"
import { computed } from "@vue/reactivity"

export default function usesortedPosts(posts) {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        return [...posts.value].sort((post1, post2) =>
        post1[selectedSort.value]?.localeCompare(post2[selectedSort])
      ); 
    })
    return {
        selectedSort, sortedPosts
    }
}