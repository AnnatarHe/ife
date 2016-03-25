(function() {
    'use strict';

    // 只支持chrome 49
    (function() {
        if (navigator.userAgent.indexOf('Chrome/49') < 0) {
            alert('由于使用了较多的es2015特性，仅支持chrome 49，请换用现代浏览器')
            document.querySelector('body').innerHTML = '<h1 style="color: #fff">由于使用了较多的es2015特性，仅支持chrome 49，请换用现代浏览器</h1>'

            throw Error('由于使用了较多的es2015特性，仅支持chrome 49，请换用现代浏览器')
        }
    })()


    // 检查表单
    let Rules = {
        email: /.+@.+\..+/g,
        nick: /[^!@#$%^&*()]{7,10}/g,
        passwd: /[\d+\w+@!#]{6,10}/g,
        desc: /.{6,255}/g,
    }


    /**
     * 错误信息的alert对象池
     * 主要是可以性能优化，不用重复创建div
     * @method get(text) 得到一个.alert的div
     * @method set(alertDom) 把一个alert存进去
     */
    let ErrorDivPool = (function() {
        let pool = [];

        let createAlert = function() {
            let alert = document.createElement('div');
            alert.classList.add('alert');
            return alert;
        }
        return {
            get: function(text) {
                let lastAlert = null;
                if (pool.length <= 0) {
                    lastAlert = createAlert();
                }else {
                    lastAlert = pool.pop();
                }

                lastAlert.innerHTML = `<p>${text}</p>`;
                return lastAlert;
            },
            set: function(alert) {
                if (alert !== undefined) {
                    pool.push(alert);
                }
            }
        }
    })();

    /**
     * @param {Object} options
     * 默认参数如下: 
     * {
     *     label: '选取规则',
     *     validator: / /, // 正则，验证规则，返回true才执行
     *     success: function() {} // 一系列的后续操作
     *     errMsg: '哎，你他妈又写错了'
     * }
     */
    class Validator {
        // options: {},
        /**
         * 初始化程序
         * 判定传进来的参数是不是有问题
         */
        validatParams(options) {
            if (options === undefined || Object.keys(options).length != 5) {
                console.log('你他妈参数都能传错？')
                console.log(`{
                     label: '选取规则',
                     blur: true, // 要不要监听事件
                     validator: //, // 正则 验证规则，返回true才执行
                     success: function() {} // 一系列的后续操作
                     errMsg: '哎，小伙子，你又写错了'
                }`);
                return false;
            } else {
                // 这个需要判定的元素的dom
                this.dom =  document.querySelector(options.label);
                this.options = options;
                return true;
            }
        }

        exec(options) {
            if ( ! this.validatParams(options) ) {
                return;
            }

            if (this.options.blur == true) {
                this.listen();
                return;
            }

            if ( ! this.run() ) {
                // 返回的是验证失败哎
                return false;
            }
        }

        run() {
            let dom = this.dom;
            if (this.options.validator.test(dom.value.trim())) {
                this.success();
            }else {
                if (! dom.classList.contains('error')) {
                    this.fail();
                }
            }
        }

        success() {
            let dom = this.dom;
            if (dom.classList.contains('error')) {
                dom.classList.remove('error');
                let oldErrorDiv = dom.parentElement.removeChild(dom.nextElementSibling);
                ErrorDivPool.set(oldErrorDiv);
            }

            // 触发钩子函数
            if (typeof this.options.success === 'function') {
                this.options.success();
            }
        }

        /**
         * 验证失败了做什么？
         * @return {} 
         */
        fail() {
            let dom = this.dom;
            dom.classList.add('error');
            let errorDom = ErrorDivPool.get(this.options.errMsg);
            dom.parentElement.appendChild(errorDom);

            return false;
        }

        listen() {
            this.dom.addEventListener('blur', e => {
                this.run();
            }, false)
        }
    }


// ---------------------------------------------------
// 
// 
// 上面的都可以分模块
// 这里是业务逻辑函数
// 
// 
// ----------------------------------------------------

    let status = (function () {
        // true 通过， false 不通过
        let errors = [{
                name: 'email',
                status: false
            }, {
                name: 'passwd',
                status: false
            }, {
                name: 'nick',
                status: false
            }, {
                name: 'desc',
                status: false
            }];

        return {
            checked: function() {
                return errors.every(current => current.status === true);
            },
            changeStatus: function(key, value) {
                for (let i of errors) {
                    if (i.name == key) {
                        i.status = value
                    }
                    console.log(i)
                }

                // 每次改变都检查一次，如果都成功了就解封提交按钮
                if ( this.checked()) {
                    document.querySelector('input[type=submit]').disabled = false;
                }
            }
        }
    })();
    
    window.addEventListener('DOMContentLoaded', e => {
        document.querySelector('input[type=submit]').addEventListener('click', e => {
            e.preventDefault();

            if ( ! status.checked()) {
                return;
            }

            console.log('uploading');

            e.target.disabled = true;
            e.target.value = '正在上传...';

            // 模仿ajax上传
            setTimeout(() => {
                e.target.value = '上传成功...'
            }, 1000);

        }, false);


        (new Validator).exec({
            label: '#email',
            blur: true,
            validator: Rules.email,
            success: function() {
                status.changeStatus('email', true);
            },
            errMsg: '哥哥，写email啊，foo@bar.com'
        });

        (new Validator).exec({
            label: '#passwd',
            blur: true,
            validator: Rules.passwd,
            success: function() {
                status.changeStatus('passwd', true);
            },
            errMsg: '哥哥，写密码啊，带个!@#三者其一就可以加密更好'
        });

        (new Validator).exec({
            label: '#nick',
            blur: true,
            validator: Rules.nick,
            success: function() {
                status.changeStatus('nick', true);
            },
            errMsg: '哎，小伙子，昵称不能有特殊字符'
        });
        (new Validator).exec({
            label: '#desc',
            blur: true,
            validator: Rules.desc,
            success: function() {
                status.changeStatus('desc', true);
            },
            errMsg: '哎，小伙子，这里写简介，6-255个字符'
        });
    }, false);

})();