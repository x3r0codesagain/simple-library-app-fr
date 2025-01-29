<template>
  
  <div>
    <NavBar/>
    
    <div class="my-6 mx-24 block">
      <div class="">
        <span class="text-4xl font-sans font-bold">List of Members</span>

        <div class="mt-5 lg:flex sm:block">

          <div class="my-2">
              <button @click="addMember" class="btn btn-rounded bg-black text-white rounded-md px-2 py-2">Add member</button>
          </div>

          <div class="my-2">
            <form @submit.prevent="filterMember" class="lg:ml-5 flex">
              <input id="search" type="text" class="t-1 font-sans bg-white border border-gray-300 text-sm focus:ring-black focus:border-black block w-44 p-2.5 h-10 "/>
              <button class="btn btn-rounded bg-white text-black outline-black outline rounded-md px-2 py-2 mx-2" type="submit">Search</button>
            </form>
          </div>
        </div>
        
      </div>
      <div class="lg:grid-cols-4 grid sm:grid-cols-1 grid-flow-row gap-4">
        <div v-for="member in members" :key="member.id">
          <Card :data="member"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/MemberCard.vue'
import router from '@/router';
import axios from 'axios';


export default {
  name: 'MemberView',
  components: {
    NavBar,
    Card
  },
  data() {
    return {
      members: [],
      
    }
  },
  methods: {
    addMember() {
      this.$toast.open({
        message: "Redirecting to Create Page",
        type: 'success'
      });

      router.push({path:'/create', query: {
        action: false,
        type: "member",
        id: "unav"
      }})
    },
    async fetchMember() {
        try {
        const response=await axios.get('http://localhost:8080/api/v1/member/get',
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
        this.members =response.data.value;
        console.log('trigger');
      } catch(error) {
        console.log('error: '+error);
      }
    },
    async filterMember() {
      
      var search =  document.getElementById("search").value;
      
      if (search == null || search === "") {
        this.fetchMember();
        return;
      }

      console.log(search);
      await this.fetchMember();
      
      
      this.members = this.members.filter(function (data) {
        return data.name.includes(search);
      });
      console.log(this.members);
    },
   
  },
  mounted() {
    this.fetchMember();
  }
}
</script>
