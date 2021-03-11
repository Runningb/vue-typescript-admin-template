interface IOption {
  label: string | number
  value: string | number | object
}
export interface IEditForm {
  label: string // model字段
  prop: string // 标签文本
  type: string // 类型
  itemWidth?: string // 表单宽

  isClearable?: boolean // 是否可清空
  row?: number // 框行数
  maxlength?: string // 最大输入长度

  isCollapseTags?: boolean // 多选时是否将选中值按文字的形式展示
  isMultiple?: boolean // 是否多选
  filterable?: boolean // 是否可搜索
  isAllowCreate?: boolean // 是否允许用户创建新条目，需配合 filterable 使用
  reserveKeyword?: boolean // 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
  isRemote?: boolean // 是否为远程搜索
  remoteMethod? (): any // 远程搜索方法
  loading?: boolean // 是否正在从远程获取数据
  options?: IOption[] // 下拉框数据

  radios?: IOption[] // 单选数据

  checkboxs?: IOption[] // 复选框数据

  format?: string // 时间格式化
  valueFormat?: string // 绑定值的格式。不指定则绑定值为 Date 对象
  default?: string[] // 范围选择时选中日期所使用的当日内具体时刻

  placeholder?: string // 输入框占位文本
  disabled?: boolean // 是否禁用
  isShow?: string | boolean // 是否显示
  width?: string // 输入框宽
  input? (): string | number // input值改变
  change? (): string | number // 失去焦点或按下回车触发
}
