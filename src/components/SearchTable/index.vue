/**
* @Description 公共表格组件
* @author candy.d.chen
* @date 2020/2/17 13:32
* @LastEditors candy.d.chen
*/
<!--usage-->
<!--<SearchTable :api="Service.getUnsignedRecordList"-->
<!--             :columns="getColumns"-->
<!--/>-->
<!--getColumns(){-->
<!--return [-->
<!--    { fixed: 'left', prop: 'index', label: '序号', minWidth: '60px' },-->
<!--    { prop: 'reportDate', label: '上报日期', minWidth: '120px', filter: 'lte-date', enums: 'YYYY-MM-DD' },-->
<!--    { prop: 'tenderProject.projectName', label: '工程名称', minWidth: '150px',  renderHref: this.renderProjectNameHref },-->
<!--    { prop: 'signStatus', label: '签约状态', filter: 'lteenum', enums: this.signStatusEnum }-->
<!--    { prop: 'operate', label: '操作', minWidth: '150px', fixed: 'right', showOverflowTooltip: false , render: this.renderButtons }-->
<!--  ];-->
<!--}-->
<script>
import _ from 'lodash'

export default {
  name: 'SearchTable',
  props: {
    columns: { type: Array, default: () => [] },
    cellStyle: { type: Function, default: () => {} },
    border: { type: Boolean, default: () => false },
    api: { type: Function, default: undefined },
    tableData: { type: Array, default: () => [] },
    joinSortList: { type: Array, default: () => [] },
    dataFormatter: { type: Function, default: () => undefined },
    requestSwitch: { type: Boolean, default: () => true },
    noPagination: { type: Boolean, default: () => false },
    conditions: { type: Object, default: () => ({}) },
    pageNumKey: { type: String, default: () => 'pageNum' },
    descKey: { type: String, default: () => 'desc' },
    paginationOptions: {
      type: Object,
      default: () => ({
        layout: 'total, sizes, prev, pager, next',
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 10
      })
    },
    defaultItemProps: {
      type: Object,
      default: () => ({
        showOverflowTooltip: false,
        headerAlign: 'left',
        align: 'left'
      })
    },
    defaultMultiStyle: {
      type: Object,
      default: () => ({
        padding: '4px 0'
      })
    }
  },
  data() {
    return {
      data: [],
      total: this.tableData.length || 0,
      currentPage: 1,
      loading: false,
      pageSize: this.paginationOptions.pageSize,
      sortParams: { orderBy: '', desc: '' }
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners
      }
    }
  },
  watch: {
    currentPage() {
      if (this.api) {
        this._getData()
      } else {
        this._sliceData()
      }
    },
    pageSize() {
      if (this.api) {
        this._getData()
      } else {
        this._sliceData()
      }
    },
    requestSwitch(val) {
      if (val) {
        this._getData()
      }
    },
    tableData(newValue) {
      const len = (newValue || []).length
      this.total = len
      this._sliceData()
      if (len !== this.data.length) {
        this.shouldChangePage(len)
      }
    }
  },

  created() {
    this.$emit('refresh', this._getData)
  },
  mounted() {
    this._getData()
  },
  destroyed() {
    this.$emit('refresh', this._getData)
  },
  methods: {
    shouldChangePage(len) {
      const currentPage = Math.ceil(len / this.paginationOptions.pageSize)
      if (currentPage > this.currentPage || currentPage < this.currentPage) {
        this.currentPage = currentPage
        this.$emit('changePagination', { currentPage, pageSize: this.pageSize })
      }
    },
    /**
     * 获取数据
     * @private
     */
    _getData() {
      if (!this.requestSwitch || !this.api) {
        if (this.tableData && this.tableData.length > 0) {
          this.data = this.noPagination
            ? this.tableData
            : this.tableData.slice(0, this.paginationOptions.pageSize)
        }
        return false
      }
      const { pageSize, currentPage, sortParams } = this
      this.loading = true
      let _this = this
      const params = {
        ...this.conditions,
        pageSize,
        [this.pageNumKey]: currentPage,
        orderBy: sortParams.orderBy,
        desc: sortParams.desc
      }

      this.api(params)
        .then(res => {
          let certainData
          if (this.noPagination) {
            certainData = res.data.data || []
          } else {
            const { data, list, total } = res.data.data
            certainData = data || list || []
            _this.total = Number(total) || 0
          }
          _this.dataFormatter && _this.dataFormatter(certainData)
          _this.data = certainData
          _this.loading = false
        })
        .catch(() => {
          _this.data = []
          _this.total = 0
          _this.loading = false
        })
    },
    _sliceData() {
      this.data = this.noPagination
        ? this.tableData
        : this.tableData.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          )
    },
    /**
     * 每页数改变
     * @param val
     */
    sizeChangeHandle(val) {
      this.pageSize = val
      this.currentPage = 1
      this.$emit('changePagination', {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
    },
    /**
     * 分页改变
     * @param val
     */
    currentChangeHandle(val) {
      this.currentPage = val
      this.$emit('changePagination', {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
    },
    /**
     * prop为多层 访问数据 eg: tenderProject.projectName
     * @param data
     * @param props
     * @returns {*}
     */
    getLevelData(data, props) {
      let getUndefined = false
      return props.reduce((acc, prop) => {
        if (!getUndefined) {
          if (acc[prop] !== undefined) {
            acc = acc[prop]
          } else {
            console.error(`can not find  prop ${prop} in data`)
            getUndefined = true
          }
        }
        return getUndefined ? '' : acc
      }, data)
    },
    /**
     * 生成index slot
     * @param scope
     * @returns {*}
     */
    generateIndexSlot(scope) {
      return (
        <span>
          {' '}
          {(this.currentPage - 1) * this.pageSize + (scope.$index + 1)}{' '}
        </span>
      )
    },
    /**
     * 生成filter slot
     * @param prop
     * @param filter
     * @param enums
     * @returns {function(*): (string|*)}
     */
    generateFilterSlot(prop = '', filter, enums) {
      return scope => {
        let text = ''
        const levelProp = prop.split('.')
        let data =
          levelProp.length > 1
            ? this.getLevelData(scope.row, levelProp)
            : scope.row[prop]
        if (filter) {
          const transForm = filter => {
            const filterFun = this[filter]
            if (!filterFun) {
              return this.$message({
                message: `不存在过滤器${filter}`,
                type: 'error'
              })
            }
            let res = enums ? filterFun(data, enums) : filterFun(data)
            data = res
            return res
          }
          if (_.isArray(filter)) {
            text = filter.reduce((acc, v) => {
              acc = transForm(v)
              return acc
            }, data)
          } else {
            text = transForm(filter)
          }
        }
        return text || data
      }
    },
    /**
     * 生成 arraykey slot
     * @param item
     * @returns {function(*): *[]}
     */
    generateArrayKey(item) {
      return scope => {
        const { arrKey, prop, filter, enums } = item
        const data = scope.row[arrKey] || []

        const transForm = (filter, value) => {
          const filterFun = this[filter]
          if (!filterFun) {
            return this.$message({
              message: `不存在过滤器${filter}`,
              type: 'error'
            })
          }
          return enums ? filterFun(value, enums) : filterFun(value)
        }

        return data.map((v, index) => {
          let text = v[prop]
          if (filter) {
            if (_.isArray(filter)) {
              text = filter.reduce((acc, v) => {
                acc = transForm(v, acc)
                return acc
              }, text)
            } else {
              text = transForm(filter, text)
            }
          }
          const style = this.calcStyle(index === data.length - 1)
          return <p style={style}> {text} </p>
        })
      }
    },
    /**
     * 计算并列td的style属性
     * @param isLast
     * @returns {string}
     */
    calcStyle(isLast) {
      return `padding: ${this.defaultMultiStyle.padding}; border-bottom: ${
        isLast ? '1px solid transparent' : '1px solid #EBEEF5'
      }`
    },
    /**
     * 生成table
     * @param columns
     * @returns {*}
     */
    renderTable(columns) {
      return columns.map((item, index) => {
        const {
          prop,
          filter,
          enums,
          render,
          renderHref,
          children,
          arrKey
        } = item
        const data = {
          props: {
            ...this.defaultItemProps,
            ...item
          }
        }
        if (prop === 'index') {
          data.scopedSlots = { default: this.generateIndexSlot }
        }
        if (filter) {
          data.scopedSlots = {
            default: this.generateFilterSlot(prop, filter, enums)
          }
        }
        if (arrKey) {
          data.scopedSlots = { default: this.generateArrayKey(item) }
        }
        if (renderHref && typeof renderHref === 'function') {
          data.scopedSlots = { default: renderHref }
        }
        if (render && typeof render === 'function') {
          data.scopedSlots = { default: render }
        }
        return (
          <el-table-column key={index} {...data}>
            {children && this.renderTable(children)}
          </el-table-column>
        )
      })
    },

    sortChange(column) {
      const { order, prop } = column
      this.sortParams = {
        orderBy: this.joinSortList.includes(prop) ? prop : '',
        [this.descKey]: order ? order === 'ascending' : ''
      }
      this._getData()
    }
  },

  render() {
    const {
      columns,
      loading,
      data,
      paginationOptions,
      currentPage,
      pageSize,
      total,
      listeners
    } = this
    return (
      <div>
        <el-row>
          <el-table
            loading={loading}
            data={data}
            border={this.border}
            empty-text="暂无数据"
            highlight-current-row={true}
            on={listeners}
            on-sort-change={this.sortChange}
            cell-style={this.cellStyle}
          >
            {this.renderTable(columns)}
          </el-table>
        </el-row>
        {this.noPagination ? null : (
          <el-row class="search-table-pagination flex-row justify-end">
            <elPagination
              layout={paginationOptions.layout}
              pageSizes={paginationOptions.pageSizes}
              pageSize={pageSize}
              currentPage={currentPage}
              total={total}
              on-size-change={this.sizeChangeHandle}
              on-current-change={this.currentChangeHandle}
            />
          </el-row>
        )}
      </div>
    )
  }
}
</script>
<style scoped lang="less">
.search-table-pagination {
  margin-top: 20px;
}
/deep/.el-table {
  color: #2d3950;
  thead {
    color: #091732;
  }
}
</style>
