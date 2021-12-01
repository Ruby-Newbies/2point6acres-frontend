<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <h3>Following</h3>
   </div>
    <el-table :data="followingList" style="width: 100%;">
        <el-table-column prop="username" min-width="130" label="UserName"></el-table-column>
        <el-table-column prop="email" min-width="130" label="Email"></el-table-column>
        <el-table-column
                fixed="right"
                label="Operation"
                width="150">
            <template slot-scope="scope">
                <el-button @click="clickView(scope.row.id)" type="text" size="small">View Profile</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :current-page="this.page"
      @current-change="this.onPageChange"
      :page-size="this.pageSize"
      :total="this.total"
      style="margin-top: 20px">
    </el-pagination>
</el-card>
</template>

<script>
import axios from 'axios'
import configJson from '../config/config.json'
export default {
  name: 'Followings',
  data () {
    return {
      followerId: '',
      followingList: [],
      page: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    getFollowing(followerId){
      let url = configJson.endpoint + '/api/v1/follows?page=' + (this.page - 1) + '&limit=' + this.pageSize
      axios.get(url + '&follower_id=' + followerId)
          .then(this.getFollowingSuccess)
          .catch(function (err) {
              console.log(err)
      })
    },
    getFollowingSuccess(res){
      console.log("successfully retrieved following list")
      console.log(res)
      this.followingList = res.data.follows
      this.total = res.data.total
    },
    clickView(userId) {
      this.$router.push('/profile/' + userId)
    },
    onPageChange(page) {
      this.page = page
      this.getFollowers(this.followerId)
    },
  },
  mounted: function () {
    this.followerId = this.$route.params.follower_id
    this.getFollowing(this.followerId)
  }
}
</script>
