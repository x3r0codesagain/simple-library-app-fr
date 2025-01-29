<template>
    <div class="nav">
        <nav class="bg-gray-100">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex flex-shrink-0 items-center">
                            <router-link to="/">
                                <div class="flex item-center">
                                    <span class="font-semibold text-xl tracking-tight ml-3 text-black">Library</span>
                                </div>
                            </router-link>
                        </div>
                        <div class="sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <router-link to="/" class=" sm:px-1 rounded-md hover:bg-gray-900 hover:text-white px-3 py-2 text-sm font-medium text-black">Book</router-link>
                                <router-link to="/author" class="rounded-md hover:bg-gray-900 hover:text-white px-3 py-2 text-sm font-medium text-black">Authors</router-link>
                                <router-link to="/member" class="rounded-md hover:bg-gray-900 hover:text-white px-3 py-2 text-sm font-medium text-black">Member</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
</script>