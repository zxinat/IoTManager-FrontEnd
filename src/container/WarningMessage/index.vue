<template>
  <div>
    <div class="search-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="选择设备">
          <el-select v-model="searchData.hardwareDeviceID" placeholder="请选择">
            <el-option
              v-for="c in dropdownDevices"
              :key="c.id"
              :label="c.deviceName"
              :value="c.hardwareDeviceID">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="设备名称">-->
          <!--<el-input v-model="searchData.deviceName"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="getAlarmInformationByDeviceId(searchData.hardwareDeviceID)"><img src="../../assets/img/find.svg">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
<!--    <h2 style="margin-left: 10px">告警规则</h2>
    <div class="table-container">
      <el-table
        :data="rulesData"
        border>
        <el-table-column
          prop="name"
          label="规则名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="规则描述">
        </el-table-column>
        <el-table-column
          prop="deviceGroup"
          label="设备">
        </el-table-column>
        &lt;!&ndash;<el-table-column&ndash;&gt;
          &lt;!&ndash;prop="handleState"&ndash;&gt;
          &lt;!&ndash;label="处理状态"&ndash;&gt;
          &lt;!&ndash;width="150">&ndash;&gt;
        &lt;!&ndash;</el-table-column>&ndash;&gt;
        <el-table-column
        prop="conditionString"
        label="规则">
      </el-table-column>
        <el-table-column
          prop="severity"
          label="告警等级">
        </el-table-column>
        &lt;!&ndash;<el-table-column&ndash;&gt;
          &lt;!&ndash;prop="severityLevel"&ndash;&gt;
          &lt;!&ndash;label="严重等级"&ndash;&gt;
          &lt;!&ndash;width="150">&ndash;&gt;
        &lt;!&ndash;</el-table-column>&ndash;&gt;
        &lt;!&ndash;<el-table-column&ndash;&gt;
        &lt;!&ndash;prop="ruleStatus"&ndash;&gt;
        &lt;!&ndash;label="开启规则"&ndash;&gt;
        &lt;!&ndash;width="150">&ndash;&gt;
       &lt;!&ndash;</el-table-column>&ndash;&gt;
        &lt;!&ndash;<el-table-column&ndash;&gt;
          &lt;!&ndash;prop="affectNumber"&ndash;&gt;
          &lt;!&ndash;label="影响数目"&ndash;&gt;
          &lt;!&ndash;width="150">&ndash;&gt;
        &lt;!&ndash;</el-table-column>&ndash;&gt;
        &lt;!&ndash;<el-table-column&ndash;&gt;
          &lt;!&ndash;fixed="right"&ndash;&gt;
          &lt;!&ndash;label="操作"&ndash;&gt;
          &lt;!&ndash;width="100">&ndash;&gt;
          &lt;!&ndash;<template slot-scope="scope">&ndash;&gt;
            &lt;!&ndash;<el-button @click="openUpdateForm(scope.row)" type="text" size="small">处理</el-button>&ndash;&gt;
            &lt;!&ndash;&lt;!&ndash;<el-button @click="deleteDevice(scope.row)" type="text" size="small">删除</el-button>&ndash;&gt;&ndash;&gt;
          &lt;!&ndash;</template>&ndash;&gt;
        &lt;!&ndash;</el-table-column>&ndash;&gt;
      </el-table>
    </div>
    <br>-->
    <h2 style="margin-left: 10px">告警信息</h2>
    <!--<div class="addbutton-container">-->
      <!--<el-button type="primary" @click="newFormVisible = true">快速处理</el-button>-->
    <!--</div>-->
    <div class="table-container">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!--<el-table-column-->
          <!--type="selection">-->
        <!--</el-table-column>-->
        <el-table-column
          fixed
          prop="deviceId"
          label="设备ID">
        </el-table-column>
        <el-table-column
          prop="indexId"
          label="数据ID">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="alarmType"-->
          <!--label="告警类型">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="handleState"-->
          <!--label="处理状态">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="alarmInfo"
          label="告警内容">
        </el-table-column>
        <el-table-column
          prop="severity"
          label="告警等级">
        </el-table-column>
        <el-table-column
          prop="timestamp"
          label="告警时间">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="handleTime"-->
          <!--label="处理时间">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="handleMethod"-->
          <!--label="处理方式">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="handleContent"-->
          <!--label="处理内容">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="openUpdateForm(scope.row)" type="text" size="small">处理</el-button>-->
            <!--&lt;!&ndash;<el-button @click="deleteDevice(scope.row)" type="text" size="small">删除</el-button>&ndash;&gt;-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <div style="text-align: center; margin-top: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="告警处理" :visible.sync="updateFormVisible">
      <el-form :model="updateData">
        <el-form-item label="处理状态" label-width="120px">
          <el-select v-model="updateData.handleState" placeholder="请选择">
            <el-option label="未处理" value="unhandled"></el-option>
            <el-option label="处理中" value="handling"></el-option>
            <el-option label="已处理" value="handled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理方式" label-width="120px">
          <el-select v-model="updateData.handleMethod" placeholder="请选择">
            <el-option label="电子邮件通知" value="email"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理内容" label-width="120px">
          <el-input v-model="updateData.handleContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handle">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="快速处理" :visible.sync="newFormVisible">
      <el-form :model="handleData">
        <el-form-item label="处理状态" label-width="120px">
          <el-select v-model="handleData.handleState" placeholder="请选择">
            <el-option label="未处理" value="unhandled"></el-option>
            <el-option label="处理中" value="handling"></el-option>
            <el-option label="已处理" value="handled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理方式" label-width="120px">
          <el-select v-model="handleData.handleMethod" placeholder="请选择">
            <el-option label="电子邮件通知" value="email"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理内容" label-width="120px">
          <el-input v-model="handleData.handleContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAll">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAlarmInfoByDeviceid,
    getAlarmInformationApi, getAllRules, getDevicesApi,
    handleAllAlarmInformationApi,
    searchAlarmInformationApi,
    updateAlarmInformationApi
  } from '../../api/api';

  export default {
        name: "WarningMessage",
      data() {
        return {
          updateFormVisible: false,
          newFormVisible: false,
          rulesData:[{
            name: '规则1',
            description: '规则描述',
            deviceGroup: '',
            condition: [{ //保留，以免增加需求
              field: '',
              operator: '',
              value: '',
            }],
            conditionString:'',//这里把condition整合成字符串
            severityLevel: '',
            ruleStatus: '',
            affectNumber: 0
          }],
          tableData: [{
            "id": "1",
            "deviceName": "设备1",
            "dataName": "警报！",
            "alarmType": "类型1",
            "handleState": "未处理",
            "alarmTime": "2018-9-9",
            "alarmContent": "警报警报哈哈哈哈",
            "handleTime":"",
            "handleMethod":"",
            "handleContent":"",
            "timestamp": "oaisdjboiadjfb"
          }],
          multipleSelection: [],
          dropdownDevices: [],
          updateData: {},
          handleData: {},
          searchData: {
            deviceID: '',
            deviceName: ''
          },
          //分页
          currentPage: 1,
          pageSize: 12,
          total: 20,
        }
      },

      methods: {
        async searchDeviceByName() {
          const data = await searchAlarmInformationApi(this.searchData);
          this.tableData = data.data.d;
        },
        async handleAll() {
          try {
            const data = await handleAllAlarmInformationApi(this.handleData,this.multipleSelection.map(el=>el.id));
            this.newFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '已选警报处理成功',
                type: 'success'
              });
              this.getAlarmInformation();
            }
          } catch (e) {
            this.newFormVisible = false;
            this.$message.error('警报处理未成功');
          }
        },
        async handle() {
          try {
            console.log('update',this.updateData);
            const data = await updateAlarmInformationApi(this.updateData);
            this.updateFormVisible = false;
            if (data.data.c === 200) {
              this.$message({
                message: '警报处理成功',
                type: 'success'
              });
              this.getAlarmInformation();
            }
          } catch (e) {
            this.updateFormVisible = false;
            this.$message.error('警报处理未成功');
          }
        },
        async openUpdateForm(row) {//打开更新表单
          this.updateData = row;
          this.updateFormVisible = true
        },
        async getAlarmInformationByDeviceId(deviceId) {
          const data = await getAlarmInfoByDeviceid(deviceId);
          this.tableData = data.data.d;
        },
        async getAlarmInformation() {
          const data = await getAlarmInformationApi();
          this.tableData = data.data.d;
        },
        handleSelectionChange(val) {
          console.log('change',this.multipleSelection);
          this.multipleSelection = val;
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
        },
        //Wqm wrote from here
        handleCurrentChange(currentPage) {
          console.log(`当前页: ${currentPage}`);
          this.currentPage = currentPage;
        }
        //finish here
      },
      async mounted() {
        //获取所有设备信息
        this.getAlarmInformation();
        this.rulesData = (await getAllRules()).data.d;
        this.dropdownDevices = (await getDevicesApi()).data.d;
        console.log(this.dropdownDevices);
        // 此处需要获取所有告警规则信息的接口，返回态如rulesData。
      }
    }
</script>

<style scoped>
  .search-container, .addbutton-container ,.table-container{
    margin:1% 1%;
    text-align: left;
  }
</style>
