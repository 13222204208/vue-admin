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
  </el-table>

</div>
</template>
<script>
  import { indexPermission} from '@/api/permission'
  export default {
    data() {
      return {
        tableData:[]
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
      }
    }

  }
</script>
