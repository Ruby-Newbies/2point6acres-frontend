<template>
    <div>
        <el-table :data="mails" style="width: 100%;">
            <el-table-column prop="sender" min-width="250" label="Sender"></el-table-column>
            <el-table-column prop="time" min-width="130" label="Time"></el-table-column>
            <el-table-column prop="status" min-width="130" label="Status"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operation"
                    width="150">
                <template slot-scope="scope">
                    <el-button @click="clickView(scope.row.id)" type="text" size="small">View</el-button>
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

        <el-dialog
                title="Message"
                :visible.sync="this.showDialog"
                :before-close="this.closeDialog"
                width="30%">
                <div style="text-align: right">
                    <h3>{{ senderId }}</h3>
                </div>
                <span>{{ mailContent }}</span>
            <span slot="footer">
                <el-button type="danger" plain @click="this.closeDialog">Close</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import configJson from '../config/config.json'
    export default {
        name: 'Mail',
        data: function() {
            return {
                mails: [],
                page: 1,
                pageSize: 5,
                total: 0,
                showDialog: true,
                senderId: 0,
                mailContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
        },
        methods: {
            getMailsForUser(userId) {
                // TODO: retrieve mails list with pagination
            },
            onPageChange(page) {
                this.page = page
                this.listArticlesOfSection(this.activeSectionId)
            },
            clickView(mailId) {
                this.showDialog = true
                // TODO: retrieve mail
            },
            closeDialog() {
                this.showDialog = false
                this.senderId = 0
                this.mailContent = ""
                // TODO: mark the mail as read if it is originally unread, and then refresh the list
            }
        },
        mounted() {
            let userId = this.$store.state.userId
            this.getMailsForUser(userId)
        }
    }
</script>

<style scoped>

</style>
