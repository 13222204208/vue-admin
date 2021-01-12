<template>
  <div class="app-container">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  import { storeAccount } from '@/api/account'
  import { Message } from 'element-ui'
  export default {
     data() {
       var checkUsername = (rule, value, callback) => {
         if (!value) {
           return callback(new Error('用户名不能为空'));
         }
         setTimeout(() => {

             if (value.length < 6 || value.length >30) {
               callback(new Error('必须大于6 小于 30个字符'));
             } else {
               callback();
             }

         }, 1000);
       };
       var checkName = (rule, value, callback) => {
         setTimeout(() => {

             if (value.length >30) {
               callback(new Error('必须小于 30个字符'));
             } else {
               callback();
             }

         }, 500);
       };
       var validatePass = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请输入密码'));
         } else {
           if (this.ruleForm.checkPass !== '') {
             this.$refs.ruleForm.validateField('checkPass');
           }
           callback();
         }
       };
       var validatePass2 = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请再次输入密码'));
         } else if (value !== this.ruleForm.password) {
           callback(new Error('两次输入密码不一致!'));
         } else {
           callback();
         }
       };
       return {
         ruleForm: {
           password: '',
           checkPass: '',
           username: '',
           name:''
         },
         rules: {
           pass: [
             { validator: validatePass, trigger: 'blur' }
           ],
           checkPass: [
             { validator: validatePass2, trigger: 'blur' }
           ],
           username: [
             { validator: checkUsername, trigger: 'blur' }
           ],
           name: [
             { validator: checkName, trigger: 'blur' }
           ]
         }
       };
     },
     methods: {
       submitForm(formName) {
         this.$refs[formName].validate((valid) => {
           console.log( this.ruleForm);
           if (valid) {
             storeAccount(this.ruleForm).then(response => {
               Message({
                 message: response.message,
                 type: 'success',
                 duration: 1 * 1000
               })
              console.log(response);
            });
           } else {
             console.log('error submit!!');
             return false;
           }
         });
       },
       resetForm(formName) {
         this.$refs[formName].resetFields();
       }
     }
   }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
