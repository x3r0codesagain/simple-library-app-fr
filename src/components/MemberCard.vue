<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow sm:w-44 lg:w-64 h-auto">
    <div class="p-5 h-full">
        <h5 class="mb-2 lg:text-2xl font-bold tracking-tight text-gray-900 sm:text-sm">Name: {{ data.name }}</h5>
        <p class="mb-3 font-normal text-gray-700 lg:text-md sm:text-sm">Gender: {{ data.gender }}</p>
        <p class="mb-3 font-normal text-gray-700 lg:text-md sm:text-sm">Email: {{ data.email }}</p>
        <p class="mb-3 font-normal text-gray-700 lg:text-md sm:text-sm">Phone No: {{ data.phone }}</p>
        <button @click="openBorrowed" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-white hover:outline-black hover:outline hover:text-black">
            Borrowed Books
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>

        <div class="mt-2">
          <button @click="openEditMember" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-white hover:outline-black hover:outline hover:text-black">
              Edit
          </button>
          <button @click="deleteMember" class="ml-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-white hover:outline-red-600 hover:outline hover:text-red-600">
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
  name: "MemberCard",
  props: ["data"],
  methods: {
    openEditMember() {
      this.$toast.open({
        message: "Redirecting to Edit Page",
        type: 'success'
      });

      router.push({path:'/edit', query: {
        action: true,
        type: "member",
        id: this.data.email,
      }})
    },
    openBorrowed() {
      this.$toast.open({
        message: "Redirecting to List",
        type: 'success'
      });

      router.push({path:'/borrowed', query: {
        id: this.data.email
      }})
    },
    async deleteMember() {
      try {
        const response=await axios.post('http://localhost:8080/api/v1/member/delete?id='+this.data.email,
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