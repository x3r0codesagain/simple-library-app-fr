<template>
  
  <div>
    <NavBar/>

    <div class="mx-5 lg:mx-24 my-6 block">
      <div class="mb-5 block">
        <span class="text-4xl font-sans font-bold">List of Borrowed Books</span>
      </div>
      <div class="my-5">
        <RouterLink to="/member">
          <button class="btn rounded rounded-md bg-red-800 text-white px-10 py-2 font-sans font-bold text-xl"> Back</button>
        </RouterLink>
      </div>
      <div>
        <table class="sm:table-auto md:table-auto lg:table-fixed w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Borrowed Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in books" :key="data.id">
              <td>{{ data.book.title }}</td>
              <td>{{ data.book.author.name }}</td>
              <td>{{ data.borrowDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  
</template>

<style>
td {
  margin-left: 10px !important; 
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: sans-serif;
  font-size: large;
  border-bottom: 2px solid #FFFFFF;
}

th {
  border-bottom: 2px solid #FFFFFF;
  font-family: sans-serif;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: large;
  font-weight: bold;
}

table {
  background-color: #F5F5F7;
}
</style>

<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router';
import axios from 'axios';


export default {
  name: 'MemberBorrowedView',
  components: {
    NavBar,
  },
  data() {
    return {
      books: []
    }
  },
  methods: {
    async fetchMember(id) {
        try {
        const response=await axios.get('http://localhost:8080/api/v1/member/getOne?email=' + id,
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
          router.push('/member');
        }
        this.books =response.data.value.borrowedBooks;
      } catch(error) {
        console.log('error: '+error);
      }
    },
    configurePage() {
      const urlParams = new URLSearchParams(window.location.search);
      var id = urlParams.get('id');
      this.fetchMember(id);
    }
  },
  mounted() {
    this.configurePage();
  }
}
</script>