<template>
    <el-card shadow="never">
        <div>
            <el-input placeholder="Filter by ID" v-model="searchkey" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchName()"></el-button>
            </el-input>
        </div>
        <div style="text-align: left">
            <el-table :data="articleList">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="title" label="Title"></el-table-column>
                <el-table-column  prop="author_id" label="Author ID"></el-table-column>
                <el-table-column  prop="section_id" label="Section ID"></el-table-column>
                <el-table-column  prop="created_at" label="Create At"></el-table-column>
                <el-table-column label="Operation" width="200px">
                    <template slot-scope="scope">
                        <el-row>
                        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
  import configJson from '../../config/config.json'
  export default {
    name:'articlelist',
    data() {
      return {
        articleList: [],
        page: 1,
        pageSize: 10,
        total: 0,
        searchkey:""
      }
    },
    mounted(){
      this.listArticles()
    },
    methods: {
      onPageChange(page) {
          this.page = page
          this.listArticles()
      },
      listArticles() {
          // page is 0-indexed, so this.page - 1
          let url = configJson.endpoint + '/api/v1/articles?page=' + (this.page - 1) + '&limit=' + this.pageSize
          axios.get(url)
              .then(this.listArticlesSuccess)
              .catch(function (err) {
                  console.log(err)
              })
      },
      listArticlesSuccess(res) {
            console.log("successfully retrieved articles list")
            this.articleList = res.data.articles
            this.total = res.data.total
      },
      deleteArticlesSuccess() {
            console.log("successfully delete articles list")
      },
      async handleDelete(index, row) {
        var _this = this;
        
         this.$confirm('This operation will permanently delete the article, do you want to continue?', 'Warning', {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.articleList.splice(index,1);
          axios.delete(configJson.endpoint + '/api/v1/articles/'+row.id)
            .then(this.deleteArticlesSuccess)
          console.log('success')
          this.$message({
            type: 'success',
            message: 'Deleted Successfully!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancelled'
          });          
        });

      }
    }
  }
</script>

<style>
</style>