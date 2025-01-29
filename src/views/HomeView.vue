<template>
  
  <div>
    <NavBar/>
    
    <div class="my-6 mx-24 block">
      <div class="mb-5 block">
        <span class="text-4xl font-sans font-bold">List of Books</span>
      </div>
      <div class="mb-3 lg:flex sm:block">
        <div class="my-2">
            <button @click="addBooks" class="btn btn-rounded bg-black text-white rounded-md px-2 py-2">Add Book</button>
        </div>
        <div class="my-2">
          <form @submit.prevent="filterBooks" class="lg:ml-5 flex">
            <input type="text" id="book-search" class=" font-sans bg-white border border-gray-300 text-sm focus:ring-black focus:border-black block w-44 p-2.5 h-10 "/>
            <button class="btn btn-rounded bg-white text-black outline-black outline rounded-md px-2 py-2 mx-2" type="submit">Search</button>
          </form>
        </div>
      </div>
      <div class="lg:grid-cols-4 grid sm:grid-cols-1 grid-flow-row gap-4">
        <div v-for="book in books" :key="book.id">
          <Card :data="book"/>
        </div>
      </div>
    </div>

    <div class="my-6 mx-24 block">
      <div class="mb-5 block">
        <span class="text-4xl font-sans font-bold">List of Borrowed Books</span>
      </div>
      <div class="mb-3 lg:flex sm:block">
        <div class="my-2">
            <select id="search-cat" class="fbtn btn-rounded bg-black text-white rounded-md px-2 py-2">
              <option value="title">Title</option>
              <option value="member">Member</option>
              <option value="date">Borrow Date</option>
            </select>
        </div>
        <div class="my-2">
          <form @submit.prevent="filterBorrowedBooks" class="lg:ml-5 flex">
            <input type="text" id="borrow-search" class=" font-sans bg-white border border-gray-300 text-sm focus:ring-black focus:border-black block w-44 p-2.5 h-10 "/>
            <button class="btn btn-rounded bg-white text-black outline-black outline rounded-md px-2 py-2 mx-2" type="submit">Search</button>
          </form>
        </div>
      </div>
      <div class="lg:grid-cols-4 grid sm:grid-cols-1 grid-flow-row gap-4">
        <div v-for="book in borrowedBooks" :key="book.id">
          <BorrowedCard :data="book"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/BookCard.vue'
import BorrowedCard from '@/components/BorrowedCard.vue';
import router from '@/router';
import axios from 'axios';



export default {
  name: 'HomeView',
  components: {
    NavBar,
    Card,
    BorrowedCard
  },
  data() {
    return {
      books: [],
      borrowedBooks: [],
    }
  }, 
  methods: {
    addBooks() {
      this.$toast.open({
        message: "Redirecting to Create Page",
        type: 'success'
      });

      router.push({path:'/create', query: {
        action: false,
        type: "book",
        id: "unav"
      }})
    },
    async fetchBooks() {
        try {
        const response=await axios.get('http://localhost:8080/api/v1/book/get',
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
          router.push('/');
        }
        this.books =response.data.value;
      } catch(error) {
        console.log('error: '+error);
      }
    },
    async filterBooks() {
      
      var search =  document.getElementById("book-search").value;
      
      if (search == null || search === "") {
        this.fetchBooks();
        return;
      }
      await this.fetchBooks();
      
      
      this.books = this.books.filter(function (data) {
        return data.title.includes(search);
      });
    },
    async filterBorrowedBooks() {
      
      var search =  document.getElementById("borrow-search").value;
      var cat = document.getElementById("search-cat").value;
      
      if (search == null || search === "") {
        this.fetchBorrowedBooks();
        return;
      }
      await this.fetchBorrowedBooks();

      if (cat === 'member') {
        this.fetchMemberBorrowed(search);
      } else if (cat === 'title'){
        this.borrowedBooks = this.borrowedBooks.filter(function (data) {
          return data.book.title.includes(search);
        });
      } else if (cat === 'date'){
        this.borrowedBooks = this.borrowedBooks.filter(function (data) {
          return data.borrowDate.includes(search);
        });
      }
      
      
      
    },
    async fetchMemberBorrowed(id) {
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
          router.push('/');
        }
        this.borrowedBooks =response.data.value.borrowedBooks;
      } catch(error) {
        console.log('error: '+error);
      }
    },
    async fetchBorrowedBooks() {
        try {
        const response=await axios.get('http://localhost:8080/api/v1/book/getBorrowed',
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
          router.push('/');
        }
        this.borrowedBooks =response.data.value;
      } catch(error) {
        console.log('error: '+error);
      }
    },
  },
  mounted() {
    this.fetchBooks();
    this.fetchBorrowedBooks();
  }
  
}
</script>
