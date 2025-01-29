<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow sm:w-44 lg:w-64 h-64">
    <div class="p-5">
        <h5 class="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 sm:text-sm">Author: {{ data.name }}</h5>
        <p class="mb-3 font-normal text-gray-700 lg:text-md sm:text-sm">Gender: {{ data.gender }}</p>
        <div class="mt-2">
          <button @click="openEditAuthor" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-white hover:outline-black hover:outline hover:text-black">
              Edit
          </button>
          <button @click="deleteAuthor" class="ml-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-white hover:outline-red-600 hover:outline hover:text-red-600">
              Delete
          </button>
        </div>
    </div>
</div>

</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
  name: "AuthorCard",
  props: ["data"],
  methods: {
    openEditAuthor() {
      this.$toast.open({
        message: "Redirecting to Edit Page",
        type: 'success'
      });

      router.push({path:'/edit', query: {
        action: true,
        type: "author",
        id: this.data.id
      }})
    },
    async deleteAuthor() {
      try {
        console.log(this.data.id);
        const response=await axios.post('http://localhost:8080/api/v1/author/delete?id='+this.data.id,
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
}
</script>