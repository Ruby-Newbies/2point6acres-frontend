<template>

    <el-container>
        <el-aside width="200px">
            <el-col>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        :router="true">
                    <el-menu-item index="/articles">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Articles</span>
                    </el-menu-item>
                    <el-menu-item index="/profile">
                        <i class="el-icon-document"></i>
                        <span slot="title">My Profile</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="20"><span>2 Point 6 Acres</span></el-col>
                    <el-col :span="2" v-if="!this.$store.state.isLoggedIn">
                        <el-button type="primary" plain @click="this.onRegisterButtonClick">Register</el-button>
                    </el-col>
                    <el-col :span="2" v-if="!this.$store.state.isLoggedIn">
                        <el-button type="success" plain @click="this.onLoginButtonClick">Login</el-button>
                    </el-col>
                    <el-col :span="4" v-else>
                        {{ this.$store.state.username }}
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <Footer></Footer>
        </el-container>
    </el-container>
</template>

<script>
import axios from 'axios'
import Footer from '../pages/Footer.vue';
export default {
    name: 'MainLayout',
    components: {
        Footer
    },
    data: function() {
        return {
            windowObjectReference: null,
            previousUrl: null,
            isLoggedIn: false,
            userProfile: null,
        }
    },
    methods: {
        onLoginButtonClick() {
            this.$router.push("/login")
        },
        onRegisterButtonClick() {
            this.$router.push("/register")
        }
    }
}
</script>

<style>
    .el-header, .el-footer {
        background-color: #409EFF;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
</style>
