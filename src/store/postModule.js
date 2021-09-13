export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
              post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            );
          },
          sortedAndSearcgPost(state, getters) {
            return getters.sortedPosts.filter((post) =>
              post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
          },

    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setselectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        settotalPage(state, totalPage) {
            state.totalPage = totalPage
        },
        setsearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        }
    },
    actions: {
        async fatchPosts({state, commit}) {
            try {
              commit('setLoading', true);
              const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts",
                {
                  params: {
                    _page: state.page,
                    _limit: state.limit,
                  },
                }
              );
              commit('setTotalPage'. Math.ceil(
                response.headers["x-total-count"] / state.limit)
              );
              commit('setPosts', response.data)
             } catch (e) {
              alert("Ошибка!");
            } finally {
                commit('setLoading', false)
            }
        },
          
          async loadPosts() {
            try {
                commit('setPage', state.page + 1)
              const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts",
                {
                  params: {
                    _page: state.page,
                    _limit: state.limit,
                  },
                }
              );
              commit('setTotalPages', Math.ceil(
                response.headers["x-total-count"] / this.state.limit)
              );
              commit('setPosts', [...this.posts, ...response.data]);
            } catch (e) {
              alert("Ошибка!");
            }
          },
        },
        namespaced: true 
      
    }
