<template>
<div class="app-container">
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="title"
      label="权限名称"
      sortable
     >
    </el-table-column>
    <el-table-column
      prop="name"
      label="权限标识"
      sortable
      >
    </el-table-column>

    <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
      <template slot-scope="{row,$index}">
        <el-button type="primary" size="mini" @click="handleUpdate(row)">
          编辑
        </el-button>

        <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">

      <el-form-item label="名称" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
        修改
      </el-button>
    </div>
  </el-dialog>

  <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
    <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="key" label="Channel" />
      <el-table-column prop="pv" label="Pv" />
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>
  import { indexPermission, delPermission, updatePermission, storePermission} from '@/api/permission'
  export default {
    data() {
      return {
        tableData:[],
        temp: {
          id: undefined,
          name: '',
        },
        dialogPvVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        pvData: [],
        textMap: {
          update: '编辑',
          create: 'Create'
        },
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(){
        indexPermission().then(response=> {
          console.log(response);
          this.tableData = response.data;
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        });
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
          updatePermission(tempData.id,tempData).then(() => {
            const index = this.tableData.findIndex(v => v.id === this.temp.id)
            //this.tableData.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.getList();
            this.$notify({
              title: '提示',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
          }
        })
      },

      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPermission(index.id).then(response => {
          this.$notify({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          //this.tableData.splice(index, 1)
          this.getList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }

  }
</script>
