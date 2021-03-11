<template>
  <div class="ces-search">
    <el-form ref="searchForm" :size="size" :label-width="labelWidth" :model="searchData" :rules="searchRules" class="searchForm newBorderTop" inline>
      <el-form-item v-for="item in searchForm" v-show="item.isShow?(item.isShow==='true'?true:false):true" :label="item.label?item.label:''" :prop="item.prop" :key="item.label" :label-width="item.labelWidth">
        <!-- 输入框 -->
        <el-input
          v-if="item.type==='input'"
          :placeholder="item.placeholder"
          v-model="searchData[item.prop]"
          :size="size || item.size"
          :style="{width: item.width}"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          clearable
          @change="item.change(that,searchData[item.prop])"
          @input.native="item.inputChange&&item.inputChange(that,searchData[item.prop])"/>
        <!-- 下拉框isMultiple（是否多选） -->
        <el-select
          v-if="item.type==='select'"
          :clearable="item.isClearable"
          :collapse-tags="item.isCollapseTags"
          :multiple="item.isMultiple"
          :placeholder="item.placeholder"
          v-model="searchData[item.prop]"
          :size="size || item.size"
          :style="{width: item.width}"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          @change="item.change(that,searchData[item.prop])">
          <div v-if="item.prop==='community'">
            <el-option v-for="op in communityData" :label="op.parkName" :value="op.parkId" :key="op.id"/>
          </div>
          <div v-else>
            <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"/>
          </div>
        </el-select>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type==='date'"
          :placeholder="item.placeholder"
          v-model="searchData[item.prop]"
          :style="{width: item.width}"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          @change="item.change(that,searchData[item.prop])"/>
        <!-- 时间 -->
        <el-time-select
          v-if="item.type==='time'"
          :placeholder="item.placeholder"
          v-model="searchData[item.prop]"
          :style="{width: item.width}"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          type=""
          @change="item.change(that,searchData[item.prop])"/>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type==='dateTime'"
          :picker-options="item.pickerOptions"
          :format="item.format"
          :value-format="item.valueFormat"
          :placeholder="item.placeholder"
          :type="item.dateType"
          :style="{width: item.width}"
          v-model="searchData[item.prop]"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          @change="item.change(that,searchData[item.prop])"/>
        <!-- 时间段 -->
        <el-date-picker
          v-if="item.type==='datetimerange'||item.type==='daterange'"
          :style="{width: item.width}"
          v-model="searchData[item.prop]"
          :size="size || item.size"
          :disabled="item.disable && item.disable(searchData[item.prop])"
          :start-placeholder="item.type==='datetimerange'?'开始时间':'开始日期'"
          :end-placeholder="item.type==='datetimerange'?'结束时间':'结束日期'"
          :type="item.type"
          range-separator="至"
          @change="item.change(that,searchData[item.prop])"/>
        <el-button v-if="item.type==='button'" :disabled="item.disabled && item.disabled()" :style="item.itemStyle" :type="item.buttonType" :icon="item.icon" :size="size || item.size" style="margin:auto" @click="item.handle(that)">{{ item.buttonLabel }}</el-button>
      </el-form-item>
    </el-form>
    <div v-if="isHandle" class="buttonContent">
      <el-button v-for="item in searchHandle" v-show="item.isShow?(item.isShow==='true'?true:false):true" :loading="item.loading" :key="item.label" :disabled="item.disabled && item.disabled()" :style="item.itemStyle" :type="item.type" :icon="item.icon" :size="size || item.size" @click="item.handle(that)">{{ item.label }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { IEditForm } from '@/api/edit'

@Component({
  name: 'searchForm',
  components: {
    Form
  }
})

export default class extends Vue {
  @Prop({ default: '100px' }) private labelWidth!: string
  @Prop() private size!: string
  @Prop() private searchForm!: Array<IEditForm>
  @Prop() private searchData!: any
  @Prop() private searchRules!: Object
}
</script>
