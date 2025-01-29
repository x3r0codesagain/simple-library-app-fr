<template>
  
  <div>
    <NavBar/>
    
    <div class="my-6 mx-24 block">
      <div class="">
        <span class="text-4xl font-sans font-bold">List of Authors</span>
          <div class="mt-5 lg:flex sm:block">

            <div class="my-2">
                <button @click="addAuthor" class="btn btn-rounded bg-black text-white rounded-md px-2 py-2">Add Author</button>
            </div>

            <div class="my-2">
              <form @submit.prevent="filterAuthor" class="lg:ml-5 flex">
                <input id="search" type="text" class="t-1 font-sans bg-white border border-gray-300 text-sm focus:ring-black focus:border-black block w-44 p-2.5 h-10 "/>
                <button class="btn btn-rounded bg-white text-black outline-black outline rounded-md px-2 py-2 mx-2" type="submit">Search</button>
              </form>
            </div>
          </div>
      </div>
      <div class="lg:grid-cols-4 grid sm:grid-cols-1 grid-flow-row gap-4">
        <div v-for="author in authors" :key="author.id">
          <Card :data="author"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/AuthorCard.vue'
import router from '@/router';
import axios from 'axios';


export default {
  name: 'AuthorView',
  components: {
    NavBar,
    Card
  },
  data() {
    return {
      authors: []
    }
  },
  methods: {
    addAuthor() {
      this.$toast.open({
        message: "Redirecting to Create Page",
        type: 'success'
      });

      router.push({path:'/create', query: {
        action: false,
        type: "author",
        id: "unav"
      }})
    },
    async fetchAuthor() {
        try {
        const response=await axios.get('http://localhost:8080/api/v1/author/get',
          {
            headers: {
              'Content-type': 'application/json',
            }
          });
        if(response.data.errorCode!=null) {
          this.$toast.open({
            message: response.data.errorMessage,
            type: 'error'
          });
          router.push('/author');
        }
        this.authors =response.data.value;
      } catch(error) {
        console.log('error: '+error);
      }
    },
    async filterAuthor() {
      
      var search =  document.getElementById("search").value;
      
      if (search == null || search === "") {
        this.fetchAuthor();
        return;
      }

      console.log(search);
      await this.fetchAuthor();
      
      
      this.authors = this.authors.filter(function (data) {
        return data.name.includes(search);
      });
    },
  },
  mounted() {
    this.fetchAuthor();
  }
}
</script>
