<template>
  <div class="servId">
    <el-button type="primary" @click="dialogFormVisible = true">选择区服</el-button>
    <el-dialog
      title="选择区服"
      :visible.sync="dialogFormVisible"
      width="80%">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ServId'
})

export default class extends Vue {
  private cityOptions = ['5区 元始无极', '6区 殒神归墟', '7区 北溟幽穹', '8区 剑凌九霄']
  private dialogFormVisible = false
  private checkAll = false
  private checkedCities = ['5区 元始无极']
  private cities = ['5区 元始无极', '6区 殒神归墟', '7区 北溟幽穹', '8区 剑凌九霄']
  private isIndeterminate = true

  private handleCheckAllChange(val: []) {
    this.checkedCities = val ? this.cityOptions : []
    this.isIndeterminate = false
  }

  private handleCheckedCitiesChange(value: []) {
    let checkedCount = 0
    checkedCount = value.length
    this.checkAll = checkedCount === this.cities.length
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
  }
}
</script>

<style lang="scss" scoped>
.servId{
  display: inline-block;
  margin-right: 10px;
}
</style>
