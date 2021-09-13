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
    <!-- <div class="page_wrapper">
      <div
        v-for="pageNum in totalPage"
        :key="pageNum"
        class="page"
        :class="{ current_page: page === pageNum }"
        @click="changePages(pageNum)"
      >
        {{ pageNum }}
      </div> -->
    <!-- </div> -->
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
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" },
      ],
    };
  },
  methods: {
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
    // changePages(pageNum) {
    //   this.page = pageNum;
    // },
    async fatchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        alert("Ошибка!");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadPosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Ошибка!");
      }
    },
  },
  mounted() {
    this.fatchPosts();
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPage) {
    //     this.loadPosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearcgPost() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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
