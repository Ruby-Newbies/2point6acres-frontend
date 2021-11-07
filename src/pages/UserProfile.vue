<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>User Profile</span>
        </div>
        <el-descriptions title="My Profile" class="el-desc">
            <el-descriptions-item label="Username">username</el-descriptions-item>
            <el-descriptions-item label="Email">email@columbia.edu</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="My Articles" class="el-desc">
            <el-table :data="articles" style="width: 100%;">
                <el-table-column prop="title" width="180" label="Title"></el-table-column>
                <el-table-column prop="created_at" width="180" label="Create Time"></el-table-column>
                <el-table-column prop="updated_at" width="180" label="Update Time"></el-table-column>
                <el-table-column
                        fixed="right"
                        label="Operation"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="clickEdit(scope.row)" type="text" size="small">Edit</el-button>
                        <el-button @click="clickDelete(scope.row)" type="text" size="small">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-descriptions>
    </el-card>
</template>
<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: 'UserProfile',
        data: function () {
            return {
                profile: null,
                articles: null
            }
        },
        methods: {
            getUserProfile() {
                var userId = this.$store.state.userId
                axios.get(configJson.endpoint + '/user/' + userId)
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
                var userId = this.$store.state.userId
                // TODO: implement this method
            },
            clickEdit(row) {
                console.log(row)
                console.log(row.id)
                // TODO: implement this method
            },
            clickDelete(row) {
                // TODO: implement this method
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
