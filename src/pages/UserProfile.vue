<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>User Profile</span>
        </div>
        <el-descriptions title="My Profile" class="el-desc">
            <el-descriptions-item label="Username"> {{ this.profile.username }} </el-descriptions-item>
            <el-descriptions-item label="Email"> {{ this.profile.email }} </el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <h3>My Articles</h3>
        <el-table :data="articles" style="width: 100%;">
            <el-table-column prop="title" min-width="300" label="Title"></el-table-column>
            <el-table-column prop="created_at" min-width="100" label="Create Time"></el-table-column>
            <el-table-column prop="updated_at" min-width="100" label="Update Time"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operation"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="clickEdit(scope.row.id)" type="text" size="small">Edit</el-button>
                    <el-button @click="clickDelete(scope.row.id)" type="text" size="small">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: 'UserProfile',
        data: function () {
            return {
                profile: {
                    username: "username",
                    email: "email@columbia.edu",
                },
                articles: [{
                    id: 1,
                    title: "test-1",
                    created_at: 1,
                    updated_at: 2
                }]
            }
        },
        methods: {
            getUserProfile() {
                let userId = this.$store.state.userId
                axios.get(configJson.endpoint + '/api/v1/user/' + userId)
                    .then(this.getUserProfileSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            getUserProfileSuccess(res) {
                console.log(res)
                this.profile = res.data
                this.listArticlesByUserId(res.data.id)
            },
            listArticlesByUserId(userId) {
                // TODO: implement this method

            },
            listArticlesByUserIdSuccess(res) {
                this.articles = res.data
            },
            clickEdit(row) {
                console.log(row)
                console.log(row.id)
                // TODO: implement this method
            },
            clickDelete(articleId) {
                // TODO: implement this method
                axios.delete(configJson.endpoint + '/api/v1/articles/' + articleId)
                    .then(this.deleteArticleSuccess)
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            deleteArticleSuccess(res) {
                console.log(res)
                // refresh the articles list
                let userId = this.$store.state.userId
                this.listArticlesByUserId(userId)
            }
        },
        mounted: function () {
            this.getUserProfile()
        }
    }
</script>
<style scoped>
    .box-card {
        width: 80%;
        margin: auto;
    }

    .el-desc {
        margin-top: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>
