import { ref } from "@vue/reactivity"
import { computed } from "@vue/reactivity"

export default function usesortedAndSearcgPost(sortedPosts) {
    const searchQuery = ref('')

    const sortedAndSearcgPost = computed(() => {
        return sortedPosts.value.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      ); 
    })
    return {
        searchQuery, sortedAndSearcgPost
    }
}