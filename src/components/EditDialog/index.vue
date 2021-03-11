<template>
<div>
  <el-form ref="editForm" :size="size" :label-width="labelWidth" label-position="right" style="width: 400px; margin-left:50px;" :model="editData" :rules="editRules">
    <el-form-item v-for="item in editCfg" v-show="item.isShow?(item.isShow==='true'?true:false):true" :label="item.label" :prop="item.prop" :key="item.label">
      <!-- 输入框 -->
      <el-input
        v-if="item.type==='input'"
        :placeholder="item.placeholder"
        v-model="editData[item.prop]"
        :disabled="item.disabled"
        :style="{width: item.width?item.width:'100%'}"
        clearable
        @input.native="item.input && item.input(editData[item.prop])"

        @change="item.change && item.change(editData[item.prop])"/>
      <!-- 文本域 -->
      <el-input
        v-if="item.type==='textarea'"
        :clearable="item.isClearable"
        :placeholder="item.placeholder"
        :rows = "item.row"
        :maxlength="item.maxlength"
        :show-word-limit="item.isShowWord"
        :disabled="item.disabled"
        v-model="editData[item.prop]"
        :style="{width: item.width?item.width:'100%'}"
        type="textarea"
        @change="item.change && item.change(editData[item.prop])"/>
      <!-- 下拉框 -->
      <el-select
        v-if="item.type==='select'"
        :collapse-tags="item.isCollapseTags"
        :multiple="item.isMultiple"
        :placeholder="item.placeholder"
        :filterable="item.filterable"
        :clearable="item.isClearable"
        :allow-create="item.isAllowCreate"
        :reserve-keyword="item.reserveKeyword"
        :remote="item.isRemote"
        :loading="item.loading"
        :remote-method="item.remoteMethod"
        :style="{width: item.width?item.width:'100%'}"
        v-model="editData[item.prop]"
        :disabled="item.disabled"
        @change="item.change &&item.change(that,editData[item.prop])">
        <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"/>
      </el-select>
      <!-- 单选 -->
      <el-radio-group
        v-if="item.type==='radio'"
        v-model="editData[item.prop]"
        :disabled="item.disabled"
        @change="item.change && item.change(editData[item.prop])">
        <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ ra.label }}</el-radio>
      </el-radio-group>
      <!-- 单选按钮 -->
      <el-radio-group
        v-if="item.type==='radioButton'"
        v-model="editData[item.prop]"
        :disabled="item.disabled"
        @change="item.change && item.change(editData[item.prop])">
        <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ ra.label }}</el-radio-button>
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group
        v-if="item.type==='checkbox'"
        v-model="editData[item.prop]"
        :disabled="item.disabled"
        @change="item.change && item.change(editData[item.prop])">
        <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ ch.label }}</el-checkbox>
      </el-checkbox-group>
      <!-- 日期 -->
      <el-date-picker
        v-if="item.type==='date'"
        v-model="editData[item.prop]"
        :value-format="item.valueFormat"
        :disabled="item.disabled"
        @change="item.change && item.change(editData[item.prop])"/>
      <!-- 任意时间 -->
      <el-time-picker
        v-if="item.type==='timePicker'"
        :format="item.format"
        :value-format="item.valueFormat"
        v-model="editData[item.prop]"
        :placeholder="item.placeholder"/>
      <!-- 固定时间段 -->
      <el-time-select
        v-if="item.type==='time'"
        v-model="editData[item.prop]"
        :format="item.format"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        @change="item.change && item.change(editData[item.prop])"/>
      <!-- 日期时间 -->
      <el-date-picker
        v-if="item.type==='dateTime'"
        :format="item.format"
        :value-format="item.valueFormat"
        :default-time="item.default"
        v-model="editData[item.prop]"
        :placeholder="item.placeholder"
        :disabled="item.disable"
        type="datetime"
        @change="item.change && item.change(editData[item.prop])"/>
      <!-- 滑块 -->
      <!-- <el-slider v-if="item.type==='Slider'" v-model="editData[item.prop]"></el-slider> -->
      <!-- 开关 -->
      <el-switch
        v-if="item.type==='switch'"
        v-model="editData[item.prop]"
        :disabled="item.disabled"
        @change="item.change && item.change(editData[item.prop])"/>
    </el-form-item>
  </el-form>
  <div
    slot="footer"
    class="dialog-footer"
    style="text-align: right"
  >
    <el-button
      @click="cancel"
    >
      取消
    </el-button>
    <el-button
      type="primary"
      @click="submit"
    >
      提交
    </el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { IEditForm } from '@/api/edit'

@Component({
  name: 'EditDialog',
  components: {
    Form
  }
})

export default class extends Vue {
  @Prop({ default: '150px' }) private labelWidth!: string
  @Prop() private size!: string
  @Prop() private editCfg!: Array<IEditForm>
  @Prop() private editData!: any
  @Prop() private editRules!: Object

  submit() {
    (this.$refs.editForm as Form).validate(async(valid) => {
      if (valid) {
        this.$emit('submit', this.editData)
      }
    })
  }

  cancel() {
    this.$emit('cancel', false)
  }
}
</script>
