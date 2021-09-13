<template>
  <div>
    <h1>Заголовок с постами</h1>
    <my-input v-model="searchQuery" placeholder=" Поиск..." v-focus />
    <div class="app_btns">
      <my-button>Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>
    <post-list :posts="sortedAndSearcgPost" v-if="!isPostsLoading" />
    <div v-else>
      Идет загрузка...Тима петух
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";

import PostForm from "@/components/postForm.vue";
import PostList from "@/components/postList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" },
      ],
    };
  },
  setup(props) {
    const { posts, isPostsLoading, totalPage } = usePosts(10);
    const { sortedPosts, selectedSort } = usesortedPosts(posts);
    const { searchQuery, sortedAndSearcgPost } = usesortedAndSearcgPost(
      sortedPosts
    );
    return {
      posts,
      isPostsLoading,
      totalPage,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearcgPost,
    };
  },
};
</script>

<style>
.app_btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.page_wrapper {
  display: flex;
  margin-top: 15px;
}

.current_page {
  border: 2px solid teal;
}

.observe {
  height: 30px;
  background: green;
}
</style>
