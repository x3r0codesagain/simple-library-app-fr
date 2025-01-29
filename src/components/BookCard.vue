<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow lg:w-64 h-66">
    <div class="p-5">
        <h5 class="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 sm:text-sm">Title: {{ data.title }}</h5>
        <p class="mb-3 font-normal text-gray-700 lg:text-md sm:text-sm">Publication Year: {{ data.year }}</p>
        <p class="mb-3 font-normal text-gray-700 lg:text-md sm:text-sm">Writer: {{ data.author.name }}</p>
        <p class="mb-3 font-normal text-gray-700 lg:text-md sm:text-sm">Category: {{ data.category }}</p>
        <div class="sm:block">
          <button @click="openEditBooks" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-white hover:outline-black hover:outline hover:text-black">
              Edit
          </button>
          <button :disabled="data.borrowed" @click="openBorrowBooks" class="inline-flex ml-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-white hover:outline-black hover:outline hover:text-black">
              Borrow
          </button>
        </div>
        <div class="sm:block mt-2">
          <button @click="deleteBook" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-white hover:outline-red-600 hover:outline hover:text-red-600">Delete</button>
        </div>
        
    </div>
</div>

</template>

<script>
import router from '@/router'
import axios from 'axios';

export default {
  name: "BookCard",
  props: ["data"],
  methods: {
    openEditBooks() {
      this.$toast.open({
        message: "Redirecting to Edit Page",
        type: 'success'
      });

      router.push({path:'/edit', query: {
        action: true,
        type: "book",
        id: this.data.id
      }})
    },
    openBorrowBooks() {
      this.$toast.open({
        message: "Redirecting to Borrow Page",
        type: 'success'
      });

      router.push({path:'/borrow', query: {
        action: false,
        type: "borrow",
        id: this.data.id
      }})

      console.log(this.data.borrowed);
    },
    async deleteBook() {
      try {
        const response=await axios.post('http://localhost:8080/api/v1/book/delete?bookId='+this.data.id,
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
          
        }
        window.location.reload(true);
      } catch(error) {
        console.log('error: '+error);
      }
    },
  }
};
</script>