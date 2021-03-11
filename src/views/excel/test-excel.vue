<template>
  <div class="app-container">
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="left"
      unlink-panels
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button
      style="margin-bottom:20px;"
      type="primary"
      @click="channel"
    >
      选择渠道
    </el-button>
    <el-button
      type="primary"
      @click="query"
      icon="el-icon-search"
    >
      查询
    </el-button>
    <!-- <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width:150px;"
      prefix-icon="el-icon-document"
    /> -->
    <el-button
      :loading="downloadLoading"
      style="margin-bottom:20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >
      {{ $t('excel.selectedExport') }}
    </el-button>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
      />
      <el-table-column label="预警时间" width="180" align="center">
        <template slot-scope="{row}">
          {{ row.date }}
        </template>
      </el-table-column>
      <el-table-column
        label="渠道"
        align="center"
        width="180"
      >
        <template slot-scope="{row}">
          <el-tag>{{ row.channel }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="事件内容"
        align="center"
        width="115"
      >
        <template slot-scope="{row}">
          {{ row.content }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="双倍充值"
        width="220"
      >
        <template slot-scope="{row}">
          <i class="el-icon-time" />
          <span>{{ row.recharge }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'
import { Table } from 'element-ui'

@Component({
  name: 'SelectExcel'
})
export default class extends Vue {
  private list: IArticleData[] = []
  private listLoading = true
  private multipleSelection = []
  private downloadLoading = false
  private filename = ''
  private value2 = ''
  private pickerOptions: any = {
    shortcuts: [{
      text: '最近一周',
      onClick(picker: any) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker: any) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick(picker: any) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }]
  }

  created() {
    this.fetchData()
  }

  private async fetchData() {
    this.listLoading = true
    const { data } = await getArticles({ /* Your params here */ })
    data.items.length = 1
    this.list = data.items
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleSelectionChange(value: any) {
    this.multipleSelection = value
  }

  private handleDownload() {
    if (this.multipleSelection.length) {
      this.downloadLoading = true
      const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
      const list = this.multipleSelection
      const data = formatJson(filterVal, list)
      exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined);
      (this.$refs.multipleTable as Table).clearSelection()
      this.downloadLoading = false
    } else {
      this.$message({
        message: 'Please select at least one item',
        type: 'warning'
      })
    }
  }

  private channel() {
    console.log(111)
  }

  private query() {
    console.log(111)
  }
}
</script>
