import $ from 'jquery';

class Interface{
    /**
     * @des [获取期号]
     * @param {string} issue[当前期号]
     * @return {Promise}
     * @author Lyn
     * @date 2018/07/24 16:39:49
     */
    getOmit(issue){
        let self=this;
        return new Promise((resolve, reject)=>{
            $.ajax({
                url:'/get/omit',
                data:{issue:issue},
                dataType:'json',
                success:function (res) {
                    self.setOmit(res.data);
                    resolve.call(self,res);
                },
                error:function(err){
                    console.log(err);
                    reject.call(err);
                }
            });
        });
    }

    /**
     * @des 获取开奖号码
     * @param {string} issue[当前期号]
     * @return {Promise}
     * @author Lyn
     * @date 2018/07/24 16:50:19
     */
    getOpenCode(issue){
        let self=this;
        return new Promise((resolve, reject)=>{
            $.ajax({
                url:'/get/openCode',
                data:{issue:issue},
                dataType:'json',
                success:function (res) {
                    self.setOpenCode(res.data);
                    resolve.call(self,res);
                },
                error:function (err) {
                    reject.call(err);
                }
            });
        });
    }

    /**
     * @des  [获取当前状态]
     * @param {string} issue[当前期号]
     * @return {Promise}
     * @author Lyn
     * @date 2018/07/24 17:10:17
     */
    getState(issue){
        let self=this;
        return new Promise((resolve, reject)=>{
            $.ajax({
                url:'/get/state',
                data:{issue:issue},
                dataType:'json',
                success:function (res) {
                    resolve.call(self,res);
                },
                error:function (err) {
                    reject.call(err);
                }
            });
        });
    }

}

export default Interface