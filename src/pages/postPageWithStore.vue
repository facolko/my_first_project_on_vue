<template>
  <div>
    <h1>Заголовок с постами</h1>
    <my-input v-model="searchQuery" placeholder=" Поиск..." v-focus />
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearcgPost"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>
      Идет загрузка...Тима петух
    </div>
    <div v-intersection="loadPosts" class="observe"></div>
    <div class="page_wrapper">
      <div
        v-for="pageNum in totalPage"
        :key="pageNum"
        class="page"
        :class="{ current_page: page === pageNum }"
        @click="changePages(pageNum)"
      >
        {{ pageNum }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import PostForm from "@/components/postForm.vue";
import PostList from "@/components/postList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

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
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
    }),
    ...mapActions({
      loadPosts: "post/loadPosts",
      fatchPosts: "post/fatchPosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fatchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPage: (state) => state.post.totalPage,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearcgPost: "post/sortedAndSearcgPost",
    }),
  },
  watch: {
    // page() {
    //   this.fatchPosts();
    // },
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
