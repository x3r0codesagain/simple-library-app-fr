<template>
    <NavBar/>
    <div id="book-form" v-if="this.selectedCategory === 'book'" class="mx-5 my-6 lg:mx-24">
        <div>
            <span v-if="!this.edit" class="py-5 px-10 font-sans font-bold text-black text-4xl block">Create Book</span>
            <span v-if="this.edit" class="py-5 px-10 font-sans font-bold text-black text-4xl block">Edit Book</span>
        </div>
        <form @submit.prevent="addBook" class="py-5 px-10">
            <div>
                <label for="title" class="block">Book Title</label>
                <input type="text" id="title" class="outline outline-1 p-3 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <label for="author" class="block">Author</label>
                <input type="text" id="author" class="outline outline-1 p-3 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <label for="year" class="block">Year of Publication</label>
                <input type="text" id="year" class="outline outline-1 p-3 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <label for="categories" class="block">Categories</label>
                <select id="categories" class="font-sans bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 h-10 w-6/12">
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Fiction">Fiction</option>
                </select>
            </div>
            <div class="my-5">
                <button class="btn rounded rounded-md bg-black text-white text-lg px-5 py-2 font-bold hover:text-black hover:outline-black hover:bg-white hover:outline">Submit</button>
            </div>
        </form>
    </div>

    <div id="author-form" v-if="this.selectedCategory === 'author'" class="mx-5 my-6 lg:mx-24">
        <div class="w-full">
            <span v-if="!this.edit" class="py-5 px-5 lg:px-10 font-sans font-bold text-black text-4xl block">Create Author</span>
            <span v-if="this.edit" class="py-5 px-5 lg:px-10 font-sans font-bold text-black text-4xl block">Edit Author</span>
        </div>
        <form @submit.prevent="addAuthor" class="py-5 px-10">
            <div>
                <label for="author-name" class="block">Name</label>
                <input type="text" id="author-name" class="outline outline-1 p-5 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <label for="author-gender" class="block">Gender</label>
                <select id="author-gender" class="font-sans bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 h-10 w-6/12">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
            </div>
            <div class="my-5">
                <button class="btn rounded rounded-md bg-black text-white text-lg px-5 py-2 font-bold hover:text-black hover:outline-black hover:bg-white hover:outline">Submit</button>
            </div>
        </form>
    </div>

    <div id="member-form" v-if="this.selectedCategory === 'member'" class="mx-5 my-6 lg:mx-24">
        <div>
            <span v-if="!this.edit" class="py-5 px-10 font-sans font-bold text-black text-4xl block">Create Member</span>
            <span v-if="this.edit" class="py-5 px-10 font-sans font-bold text-black text-4xl block">Edit Member</span>
        </div>
        <form @submit.prevent="addMember(this.edit)" class="py-5 px-10">
            <div class="my-5">
                <label for="member-name" class="block">Name</label>
                <input type="text" id="member-name" class="outline outline-1 p-5 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <label for="member-email" class="block">Email</label>
                <input type="text" id="member-email" class="outline outline-1 p-5 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <label for="member-phone" class="block">Phone No.</label>
                <input type="text" id="member-phone" class="outline outline-1 p-5 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <label for="member-gender" class="block">Gender</label>
                <select id="member-gender" class="font-sans bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 h-10 w-6/12">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
            </div>
            <div class="my-5">
                <button class="btn rounded rounded-md bg-black text-white text-lg px-5 py-2 font-bold hover:text-black hover:outline-black hover:bg-white hover:outline">Submit</button>
            </div>
        </form>
    </div>

    <div id="borrow-form" v-if="this.selectedCategory === 'borrow'" class="mx-5 my-6 lg:mx-24">
        <div>
            <span class="py-5 px-10 font-sans font-bold text-black text-4xl block">Borrow Book</span>
        </div>
        <form @submit.prevent="borrow(this.borrowId)" class="py-5 px-10">
            <div>
                <label for="borrow-email" class="block">Member Email</label>
                <input type="text" id="borrow-email" class="outline outline-1 p-3 outline-teal-400 w-full lg:w-6/12 h-6"/>
            </div>
            <div class="my-5">
                <button class="btn rounded rounded-md bg-black text-white text-lg px-5 py-2 font-bold hover:text-black hover:outline-black hover:bg-white hover:outline">Submit</button>
            </div>
        </form>
    </div>
    
</template>

<style>

label {
    font-family: sans-serif;
    font-weight: bolder;
    font-size: large;
}

</style>

<script>
import NavBar from '@/components/NavBar.vue'
import router from '@/router';
import axios from 'axios';

export default {
    name: 'CreateBookView',
    props: ["isEdit", "category"],
    components: {
        NavBar
    },
    data() {
        return {
            book:{
                title: "",
                year: "",
                author: "",
                category: "",
                borrowed: false
            },
            member: {
                name: "",
                gender: "",
                email: "",
                phone: "",
                borrowedBooks: []
            },
            author: {
                id: "",
                name: "",
                gender: ""
            },
            edit: false,
            selectedCategory: "member",
            borrowId: ""
        }
    },
    methods: {
        configurePage() {
            const urlParams = new URLSearchParams(window.location.search);
            this.edit = urlParams.get('action') == 'true' ? true : false;
            this.selectedCategory = urlParams.get('type');

            if (this.edit && this.selectedCategory === 'member') {
                var id = urlParams.get('id');
                this.fetchMember(id);
            }
            if (this.edit && this.selectedCategory === 'author') {
                var authId = urlParams.get('id');
                this.fetchAuthor(authId);
            }
            if (this.edit && this.selectedCategory === 'book') {
                var bookId = urlParams.get('id');
                this.fetchBook(bookId);
            } 
            if (this.selectedCategory === 'borrow') {
                this.borrowId = urlParams.get('id');
            }
        },
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
            this.member = response.data.value;
            this.setEditMemberForm();
            } catch(error) {
            console.log('error: '+error);
            }
        },
        setEditMemberForm() {
            document.getElementById("member-name").value = this.member.name;
            document.getElementById("member-email").value = this.member.email;
            document.getElementById("member-gender").value = this.member.gender;
            document.getElementById("member-phone").value = this.member.phone;
        },
        
        async addMember(edit) {
            try {
            const response=await axios.post('http://localhost:8080/api/v1/member/add?edit='+edit,
              {
                name: document.getElementById("member-name").value,
                gender: document.getElementById("member-gender").value,
                email: document.getElementById("member-email").value,
                phone: document.getElementById("member-phone").value
              },
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
              window.location.reload(true);
            }
            router.push('/member');
          } catch(error) {
            console.log('error: '+error);
          }
        },
        
        setEditAuthorForm() {
            document.getElementById("author-name").value = this.author.name;
            document.getElementById("author-gender").value = this.author.gender;
        },
        async fetchAuthor(id) {
            try {
            const response=await axios.get('http://localhost:8080/api/v1/author/getOne?id=' + id,
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
            this.author = response.data.value;
            this.setEditAuthorForm();
            } catch(error) {
            console.log('error: '+error);
            }
        },
        async addAuthor() {
            try {
            const response=await axios.post('http://localhost:8080/api/v1/author/add?edit=' + this.edit,
              {
                id: this.author.id,
                name: document.getElementById("author-name").value,
                gender: document.getElementById("author-gender").value
              },
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
              window.location.reload(true);
            }
            router.push('/author');
          } catch(error) {
            console.log('error: '+error);
          }
        },
        setEditBookForm() {
            document.getElementById("title").value = this.book.title;
            document.getElementById("year").value = this.book.year;
            document.getElementById("author").value = this.book.author.name;
            document.getElementById("categories").value = this.book.category;
        },
        async fetchBook(id) {
            try {
            const response=await axios.get('http://localhost:8080/api/v1/book/getOne?id=' + id,
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
            this.book = response.data.value;
            this.setEditBookForm();
            } catch(error) {
            console.log('error: '+error);
            }
        },
        async addBook() {
            try {
            const response=await axios.post('http://localhost:8080/api/v1/book/add',
              {
                id: this.book.id,
                title: document.getElementById("title").value,
                year: document.getElementById("year").value,
                authorName: document.getElementById("author").value,
                category: document.getElementById("categories").value,
              },
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
              window.location.reload(true);
            }
            router.push('/');
          } catch(error) {
            console.log('error: '+error);
          }
        },

        async borrow(id) {
            try {
                const response=await axios.post('http://localhost:8080/api/v1/book/borrow',
                {
                    bookId: id,
                    email: document.getElementById('borrow-email').value
                },
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
                router.push('/');
            } catch(error) {
                console.log('error: '+error);
            }
        },
    },
    mounted() {
        this.configurePage();
    }
}
</script>